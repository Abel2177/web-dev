import React, { useState } from "react";

function OrderForm() {
 const [form, setForm] = useState({
name: "",
phone: "",
area: "summit",
});

function handleChange(e) {
const { name, value } = e.target;

  setForm({...form,[name]: value,
});
 }

 function handleSubmit(e) {
 e.preventDefault();
 alert(`thank you for ordering ${form.name}`)
console.log(form);
 }

const isPhoneValid = /^(\+251|0)9\d{8}$/.test(form.phone);

return (
<div>
<form onSubmit={handleSubmit}>
<h2>Customer Information</h2>

<label>Name:</label>
 <input
 type="text"
name="name"
 value={form.name}
onChange={handleChange}
/>

<br />

 <label>Phone:</label>
 <input
type="text"
name="phone"
value={form.phone}
 onChange={handleChange}
 />

 <br />

 <label>Area:</label>
 <input
 type="text"
 name="area"
 value={form.area}
 onChange={handleChange}
 />

<br />

 <button type="submit" disabled={!isPhoneValid}>
 Submit
 </button>
 </form>

<p>Your name is: {form.name}</p>
<p>Your phone number is: {form.phone}</p>
 <p>Your area is: {form.area}</p>
 </div>
);
}

export default OrderForm;