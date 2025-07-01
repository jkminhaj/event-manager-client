import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        image: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const  navigate = useNavigate();
    const handleChange = e =>
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await axios.post("http://localhost:5000/api/users/register", form);
            alert("Registration successful!");
            console.log(res.data);
            navigate("/signin");
        } catch (err) {
            console.log(err)
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md"
            >
                <h2 className="mb-6 text-2xl font-bold text-indigo-600">Register</h2>

                <input
                    className="mb-3 w-full rounded border p-2"
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    value={form.name}
                    onChange={handleChange}
                />

                <input
                    className="mb-3 w-full rounded border p-2"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={form.email}
                    onChange={handleChange}
                />

                <input
                    className="mb-3 w-full rounded border p-2"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={form.password}
                    onChange={handleChange}
                />

                <input
                    className="mb-3 w-full rounded border p-2"
                    type="url"
                    name="image"
                    placeholder="Photo URL (https://...)"
                    required
                    value={form.image}
                    onChange={handleChange}
                />

                {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded bg-indigo-600 py-2 text-white hover:bg-indigo-700"
                >
                    {loading ? "Submitting..." : "Register"}
                </button>
            </form>
            <div>
                Already User ? <span><Link to="/signin">Login here</Link></span>
            </div>

        </div>
    );
};

export default Register;
