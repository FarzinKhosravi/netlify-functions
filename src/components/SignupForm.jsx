import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const onSubmit = (values) => {
  console.log(values);
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function SignupForm() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  // const netlifyURL = "http://localhost:8888/.netlify/functions/dataApi";

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:8888/.netlify/functions/dataApi")
      .then(({ data }) => {
        console.log(data);

        setProducts(data.products);

        setLoading(false);
      });
  }, []);

  // console.log("Error:", formik.errors);
  // console.log("Touched:", formik.touched);

  console.log(products);

  return (
    <div>
      <form className="mb-4" onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            className="ml-2 rounded-xl text-xs"
            type="text"
            id="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            name="name"
          />

          <div>
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-500">{formik.errors.name}</p>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            className="ml-2 rounded-xl text-xs"
            type="text"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            name="email"
          />

          <div>
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500">{formik.errors.email}</p>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            className="ml-2 rounded-xl text-xs"
            type="text"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            name="password"
          />

          <div>
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500">{formik.errors.password}</p>
            )}
          </div>
        </div>

        <div>
          <button type="submit" className="rounded-xl bg-yellow-400 px-4 py-2">
            Submit
          </button>
        </div>
      </form>

      <div>
        {!products || loading ? (
          <p>Loading...</p>
        ) : (
          products.map((product) => {
            return (
              <div key={product.id} className="mb-4">
                <p>{product.name}</p>
                <p>{product.des}</p>
                <p>{product.productCode}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default SignupForm;
