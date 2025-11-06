import React, { useState } from "react";

function UserFetcher() {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);

  const handleFetch = async () => {
    // clear previous data
    setUser(null);
    setError("");
    setNotFound(false);

    // basic validation
    if (!userId || isNaN(userId)) {
      setError("Please enter a valid user ID (1–10).");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (Object.keys(data).length === 0) {
        setNotFound(true);
      } else {
        setUser(data);
      }
    } catch (err) {
      setError("Failed to fetch user data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>User Data Fetcher</h2>
      <input
        type="number"
        placeholder="Enter User ID (1–10)"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleFetch}>Fetch User</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {notFound && <p>User not found.</p>}

      {user && (
        <div style={{ marginTop: "20px" }}>
          <h3>{user.name}</h3>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Website:</strong> {user.website}
          </p>
        </div>
      )}
    </div>
  );
}

export default UserFetcher;
