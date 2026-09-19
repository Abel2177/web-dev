import { useRef, useState } from "react";

function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!form.phone.trim()) {
    errors.phone = "TeleBirr phone is required.";
  } else if (!/^09\d{8}$/.test(form.phone)) {
    errors.phone = "Enter a valid Ethiopian phone number.";
  }

  if (!form.area) {
    errors.area = "Please select a delivery area.";
  }

  return errors;
}

function Checkout() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
    notes: "",
  });

  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [requestError, setRequestError] = useState("");

  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const areaRef = useRef(null);

  const errors = validate(form);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setRequestError("");
  }

  function handleBlur(event) {
    const { name } = event.target;

    setTouched((current) => ({
      ...current,
      [name]: true,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const allTouched = {
      name: true,
      phone: true,
      area: true,
      notes: true,
    };

    setTouched(allTouched);
    setRequestError("");

    const validationErrors = validate(form);

    // Focus first bad field
    if (validationErrors.name) {
      nameRef.current.focus();
      return;
    }

    if (validationErrors.phone) {
      phoneRef.current.focus();
      return;
    }

    if (validationErrors.area) {
      areaRef.current.focus();
      return;
    }

    setSubmitting(true);

    // Simulate failed request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitting(false);

    setRequestError(
      "Order failed: TeleBirr payment could not be processed. Please try again."
    );

    // Keep all values and focus the first field that needs attention
    phoneRef.current.focus();
  }

  return (
    <section>
      <h2>Checkout</h2>

      {requestError && (
        <p role="alert">
          {requestError}
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="name">Name</label>

          <input
            ref={nameRef}
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={
              touched.name && errors.name ? "true" : "false"
            }
            aria-describedby={
              touched.name && errors.name
                ? "name-error"
                : undefined
            }
          />

          {touched.name && errors.name && (
            <p id="name-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone">TeleBirr Phone</label>

          <input
            ref={phoneRef}
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="09XXXXXXXX"
            aria-invalid={
              touched.phone && errors.phone ? "true" : "false"
            }
            aria-describedby={
              touched.phone && errors.phone
                ? "phone-error"
                : undefined
            }
          />

          {touched.phone && errors.phone && (
            <p id="phone-error" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="area">Delivery Area</label>

          <select
            ref={areaRef}
            id="area"
            name="area"
            value={form.area}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={
              touched.area && errors.area ? "true" : "false"
            }
            aria-describedby={
              touched.area && errors.area
                ? "area-error"
                : undefined
            }
          >
            <option value="">Select area</option>
            <option value="Bole">Bole</option>
            <option value="Kazanchis">Kazanchis</option>
            <option value="Megenagna">Megenagna</option>
            <option value="Piassa">Piassa</option>
          </select>

          {touched.area && errors.area && (
            <p id="area-error" role="alert">
              {errors.area}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="notes">Notes (optional)</label>

          <textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? "Processing..." : "Place Order - 500 ETB"}
        </button>
      </form>
    </section>
  );
}

export default Checkout;