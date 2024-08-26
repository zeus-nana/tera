import { useState, useMemo, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import AdminService from "../../services/adminService";
import Spinner from "../../ui/Spinner";
import UsersRow from "./UsersRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination.jsx";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../constants.js";

const FilterInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 8px;
  font-size: 1.2rem;
`;

const HeaderCell = styled.div`
  display: flex;
  flex-direction: column;
`;

function UsersTable() {
  const [filters, setFilters] = useState({
    login: "",
    username: "",
    email: "",
    profile: "",
    phone: "",
    department: "",
    localisation: "",
    active: "",
  });

  const {
    isLoading,
    data: response,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: AdminService.getAllUsers,
  });

  const getUsers = useCallback(() => {
    return {
      users: response?.data?.data?.users ?? [],
      results: response?.data?.results ?? 0,
    };
  }, [response]);

  const [searchParams, setSearchParams] = useSearchParams();

  const filteredUsers = useMemo(() => {
    const { users } = getUsers();

    return users.filter((user) =>
      Object.entries(filters).every(([key, value]) => {
        if (value === "") return true;
        const userValue = user[key]?.toString().toLowerCase() ?? "";
        return userValue.includes(value.toLowerCase());
      }),
    );
  }, [getUsers, filters]);

  const pageCount = Math.ceil(filteredUsers.length / PAGE_SIZE);

  // Validation et correction de la page courante
  const currentPage = useMemo(() => {
    const pageParam = searchParams.get("page");
    let page = 1;

    if (pageParam) {
      page = parseInt(pageParam, 10);
      if (isNaN(page) || page < 1) {
        page = 1;
      } else if (page > pageCount) {
        page = pageCount;
      }
    }

    return page;
  }, [searchParams, pageCount]);

  // Mise à jour des paramètres de recherche si nécessaire
  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam !== currentPage.toString()) {
      setSearchParams((prev) => {
        prev.set("page", currentPage.toString());
        return prev;
      });
    }
  }, [currentPage, searchParams, setSearchParams]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setSearchParams((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.1fr 0.4fr 1fr 0.8fr 0.4fr 0.5fr 0.5fr 0.5fr 0.4fr 0.1fr;">
        <Table.Header>
          <div></div>
          <HeaderCell>
            <div>Login</div>
            <FilterInput
              type="text"
              name="login"
              value={filters.login}
              onChange={handleFilterChange}
            />
          </HeaderCell>
          <HeaderCell>
            <div>Nom</div>
            <FilterInput
              type="text"
              name="username"
              value={filters.username}
              onChange={handleFilterChange}
            />
          </HeaderCell>
          <HeaderCell>
            <div>Email</div>
            <FilterInput
              type="text"
              name="email"
              value={filters.email}
              onChange={handleFilterChange}
            />
          </HeaderCell>
          <HeaderCell>
            <div>Téléphone</div>
            <FilterInput
              type="text"
              name="phone"
              value={filters.phone}
              onChange={handleFilterChange}
            />
          </HeaderCell>
          <HeaderCell>
            <div>Profile</div>
            <FilterInput
              type="text"
              name="profile"
              value={filters.profile}
              onChange={handleFilterChange}
            />
          </HeaderCell>
          <HeaderCell>
            <div>Département</div>
            <FilterInput
              type="text"
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
            />
          </HeaderCell>
          <HeaderCell>
            <div>Localisation</div>
            <FilterInput
              type="text"
              name="localisation"
              value={filters.localisation}
              onChange={handleFilterChange}
            />
          </HeaderCell>
          <HeaderCell>
            <div>Statut</div>
            <FilterInput
              type="text"
              name="active"
              value={filters.active}
              onChange={handleFilterChange}
            />
          </HeaderCell>
        </Table.Header>

        <Table.Body
          data={paginatedUsers}
          render={(user) => <UsersRow key={user.id} user={user} />}
        />

        <Table.Footer>
          <Pagination
            count={filteredUsers.length}
            currentPage={currentPage}
            pageCount={pageCount}
          />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default UsersTable;
