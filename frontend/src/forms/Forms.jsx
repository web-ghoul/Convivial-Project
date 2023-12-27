import { useFormik } from 'formik';
import * as yup from 'yup';
import SearchForm from './SearchForm/SearchForm';

const Forms = ({type}) => {

  //Search
  const searchValidationSchema = yup.object({
    search: yup
      .string('Enter your Search')
  });

  const searchInitialValues={
    search:""
  }

  const searchFormik = useFormik({
    initialValues: searchInitialValues,
    validationSchema: searchValidationSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  });

  return (
   <form onSubmit={type === "search" && searchFormik.handleSubmit}>
    {
      type === "search" && <SearchForm formik={searchFormik} />
    }
   </form>
  )
}

export default Forms