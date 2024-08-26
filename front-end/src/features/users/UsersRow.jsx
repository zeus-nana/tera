import { HiLockClosed, HiPencil } from "react-icons/hi2";
import { HiBan } from "react-icons/hi";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import PropTypes from "prop-types";
import CreateUserForm from "./CreateUserForm.jsx";
import ConfirmAction from "../../ui/ConfirmAction.jsx";
import styled from "styled-components";
import { useUser } from "../authentication/useUser.js";

const Avatar = styled.img`
  width: 2.4rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
  display: flex; /* Ajouté */
  align-items: center; /* Ajouté */
  margin-right: 0.5rem; /* Espacement entre l'avatar et le login */
`;

function UsersRow({ user }) {
  const { user: currentUser } = useUser();

  const {
    id,
    login,
    username,
    email,
    phone,
    profile,
    department,
    localisation,
    active,
  } = user;

  return (
    <Table.Row>
      <div>
        <Avatar src={"default-user.jpg"} alt="Avatar" />
      </div>
      <div>{login}</div>
      <div>{username}</div>
      <div>{email}</div>
      <div>{phone}</div>
      <div>{profile?.toUpperCase()}</div>
      <div>{department ? department.toUpperCase() : ""}</div>
      <div>{localisation ? localisation.toUpperCase() : ""}</div>
      <div>{active ? "Actif" : "Inactif"}</div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id.toString()} />
            <Menus.List id={id.toString()}>
              <Modal.Open opens="edit">
                <Menus.Button
                  icon={<HiPencil />}
                  disabled={currentUser.id === id}
                >
                  Éditer
                </Menus.Button>
              </Modal.Open>

              <Modal.Open opens="resetUserPassword">
                <Menus.Button icon={<HiLockClosed />}>
                  Réinitialiser le mot de passe
                </Menus.Button>
              </Modal.Open>

              <Modal.Open opens="activateDeactivate">
                <Menus.Button icon={<HiBan />}>
                  {active ? "Désactiver" : "Activer"}
                </Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="activateDeactivate">
              <ConfirmAction
                action={active ? "deactivate" : "activate"}
                id={id}
              />
            </Modal.Window>

            <Modal.Window name="resetUserPassword">
              <ConfirmAction action="resetUserPassword" id={id} />
            </Modal.Window>

            <Modal.Window name="edit">
              <CreateUserForm userToEdit={user} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

UsersRow.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UsersRow;
