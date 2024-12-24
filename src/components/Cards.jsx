import React, { useEffect, useState } from "react";

const Cards = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the user data from the API
    fetch("https://randomuser.me/api/?page=1&results=1&seed=abc")
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setUser(data.results[0]);
        }
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {user ? (
        <div className={`max-w-sm w-full group perspective cursor-pointer`}>
          <div
            className={`relative w-full h-64 transition-transform duration-[2000ms] transform group-hover:rotate-y-180`}
          >
            {/* Back Side */}
            <div className="absolute w-full h-full bg-gray-200 shadow-lg rounded-lg p-4 transform rotate-y-180 flex flex-col items-center justify-center">
              <h2 className="text-xl font-semibold text-gray-700 mt-4 text-center">
                {`${user.name.first} ${user.name.last}`}
              </h2>
              <div className="mt-4 text-sm text-gray-600 text-center">
                <p>
                  <strong>Address:</strong>{" "}
                  {`${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`}
                </p>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {new Date(user.dob.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Age:</strong> {user.dob.age} years
                </p>
              </div>
            </div>
            {/* Front Side */}
            <div className="hover:opacity-0 absolute w-full h-full bg-white shadow-lg rounded-lg flex items-center justify-center gap-3">
              <img
                className="w-32 h-32 rounded-full border-2 border-gray-200"
                src={user.picture.large}
                alt="User Profile"
              />
              <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-semibold text-gray-700">
                  {`${user.name.first} ${user.name.last}`}
                </h2>
                <p className="text-lg text-gray-600 capitalize">
                  <strong>Gender:</strong> {user.gender}
                </p>
                <p className="text-lg text-gray-600">
                  <strong>Phone:</strong> {user.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Cards;
