import PropTypes from "prop-types";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import { useCreateUser } from "./useCreateUser";
import SpinnerMini from "../../ui/SpinnerMini";

// Définition des énumérations
const UserProfile = {
  GESTIONNAIRE: "GESTIONNAIRE",
  REPORTING: "REPORTING",
  IT_SUPPORT: "IT_SUPPORT",
};

const UserLocalisation = {
  SIEGE: "SIÈGE",
  ADAMAOUA: "ADAMAOUA",
  CENTRE: "CENTRE",
  EST: "EST",
  EXTREME_NORD: "EXTREME_NORD",
  LITTORAL: "LITTORAL",
  NORD: "NORD",
  NORD_OUEST: "NORD_OUEST",
  OUEST: "OUEST",
  SUD: "SUD",
  SUD_OUEST: "SUD_OUEST",
};

const localisationOptions = Object.values(UserLocalisation).map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1).replace("_", " "),
}));

const profileOptions = Object.values(UserProfile).map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

function CreateUserForm({ onCloseModal, userToEdit = {} }) {
  const { id: userId, ...editValues } = userToEdit;
  const isEditing = !!userId;

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditing
      ? editValues
      : {
          localisation: null,
          profile: null,
        },
  });

  const { errors } = formState;

  const { isCreating, creatingUser } = useCreateUser(onCloseModal);

  function onSubmit(data) {
    if (isEditing) {
      data.id = userId;
    }
    creatingUser(
      { ...data },
      {
        onSuccess: async () => {
          reset();
        },
      },
    );
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "default"}
    >
      <FormRow label="Login" error={errors?.login?.message}>
        <Input
          type="text"
          id="login"
          disabled={isCreating}
          {...register("login", {
            required: "Ce champ est obligatoire.",
          })}
        />
      </FormRow>
      <FormRow label="Nom" error={errors?.username?.message}>
        <Input
          type="text"
          id="username"
          disabled={isCreating}
          {...register("username", {
            required: "Ce champ est obligatoire.",
          })}
        />
      </FormRow>
      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isCreating}
          {...register("email", {
            required: "Ce champ est obligatoire.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Adresse email invalide.",
            },
          })}
        />
      </FormRow>
      <FormRow label="Téléphone" error={errors?.phone?.message}>
        <Input
          type="tel"
          id="phone"
          disabled={isCreating}
          {...register("phone", {
            required: "Ce champ est obligatoire.",
            pattern: {
              value: /^[0-9]+$/,
              message: "Le numéro ne doit contenir que des chiffres.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Profil" error={errors?.profile?.message}>
        <Select
          options={profileOptions}
          id="profile"
          disabled={isCreating}
          {...register("profile", {
            required: "Ce champ est obligatoire.",
          })}
        />
      </FormRow>

      <FormRow label="Département" error={errors?.department?.message}>
        <Input
          type="text"
          id="department"
          disabled={isCreating}
          {...register("department")}
        />
      </FormRow>

      <FormRow label="Localisation" error={errors?.localisation?.message}>
        <Select
          options={localisationOptions}
          id="localisation"
          disabled={isCreating}
          {...register("localisation", {
            required: "Ce champ est obligatoire.",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isCreating}
        >
          Annuler
        </Button>
        <Button size="medium" disabled={isCreating}>
          {!isCreating ? "Enregistrer" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

CreateUserForm.propTypes = {
  userToEdit: PropTypes.object,
  onCloseModal: PropTypes.func,
};

export default CreateUserForm;
