import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
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
            const res = await axios.post("http://localhost:5000/api/users/login", form);
            console.log(res.data.user);
            localStorage.setItem("user",JSON.stringify(res.data.user));
            navigate("/");
        } catch (err) {
            console.log(err.data);
            setError(err.response?.data?.message || "Login failed");
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
                <h2 className="mb-6 text-2xl font-bold text-indigo-600">Login</h2>

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

                {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded bg-indigo-600 py-2 text-white hover:bg-indigo-700"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
                <div>
                    New Here ? <span><Link to="/signup">Create an account</Link></span>
                </div>
            </form>
        </div>
    );
};

export default Login;
