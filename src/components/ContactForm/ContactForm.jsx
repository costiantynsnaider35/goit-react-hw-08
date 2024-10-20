import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import s from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";

const ContactForm = () => {
  const dispatch = useDispatch();

  const validNumber = /^\d{3}-\d{3}-\d{4}$/;

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required("Required!!!"),
    number: Yup.string()
      .matches(
        validNumber,
        "Please enter your phone number in 123-456-7890 format!"
      )
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required("Required!!!"),
  });

  const initialValues = {
    name: "",
    number: "",
  };

  const handleSubmit = (values, options) => {
    const addNewContact = {
      name: values.name,
      number: values.number,
    };
    dispatch(addContact(addNewContact));
    options.resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={s.form}>
          <div className={s.formList}>
            <label htmlFor="name">Name</label>
            <Field
              className={s.inputList}
              name="name"
              type="text"
              id="name"
              placeholder="Enter first and last name!"
            />
            <ErrorMessage className={s.error} name="name" component="span" />
          </div>

          <div className={s.formList}>
            <label htmlFor="number">Number</label>
            <Field
              className={s.inputList}
              type="text"
              name="number"
              id="number"
              placeholder="Enter the phone number!"
            />
            <ErrorMessage className={s.error} name="number" component="span" />
          </div>

          <button className={s.addButton} type="submit">
            Add Contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
