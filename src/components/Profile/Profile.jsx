// import React, { useEffect, useState } from "react";
// import "./profile.css";

// const getRandomDate = () => {
//   const start = new Date(2022, 0, 1);
//   const end = new Date();
//   return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
// };

// const Dashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortOrder, setSortOrder] = useState("newest");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/users")

//     // fetch("https://dummyjson.com/docs/users")
//       .then((res) => res.json())
//       .then((data) => {
//         const usersWithExtras = data.map((user) => ({
//           ...user,
//           status: Math.random() > 0.5 ? "Active" : "Inactive",
//           date: getRandomDate(),
//         }));
//         setUsers(usersWithExtras);
//       });
//   }, []);

//   const handleStatusToggle = (id) => {
//     setUsers((prev) =>
//       prev.map((user) =>
//         user.id === id
//           ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
//           : user
//       )
//     );
//   };

//   const filtered = users.filter((user) =>
//     user.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const sorted = [...filtered].sort((a, b) =>
//     sortOrder === "newest"
//       ? new Date(b.date) - new Date(a.date)
//       : new Date(a.date) - new Date(b.date)
//   );

//   const totalPages = Math.ceil(sorted.length / itemsPerPage);
//   const indexOfLast = currentPage * itemsPerPage;
//   const indexOfFirst = indexOfLast - itemsPerPage;
//   const currentUsers = sorted.slice(indexOfFirst, indexOfLast);

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString("en-GB", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });

//   return (
//     <div className="dashboard-container">
//       <div className="cards">
//         <div className="card">
//           <h3>Total Users</h3>
//           <div className="value">{users.length}</div>
//           {/* <div className="subtext green">+100 this week</div> */}
//         </div>
//         <div className="card">
//           <h3>Members</h3>
//           <div className="value">10</div>
//           {/* <div className="subtext red">-5 this week</div> */}
//         </div>
//         <div className="card">
//           <h3>Active Now</h3>
//           <div className="value">
//             {users.filter((u) => u.status === "Active").length}
//           </div>
//           {/* <div className="subtext green">+1</div> */}
//         </div>
//       </div>

//       <div className="table-section">
//         <div className="table-header">
//           <div className="left">
//             <h2>All Customers</h2>
//             <span className="active-link">Active Members</span>
//           </div>
//           <div>
//             <input
//               type="text"
//               className="search"
//               placeholder="Search..."
//               onChange={(e) => {
//                 setSearchQuery(e.target.value);
//                 setCurrentPage(1);
//               }}
//             />
//             <select
//               className="sort"
//               onChange={(e) => setSortOrder(e.target.value)}
//             >
//               <option value="newest">Sort by: Newest</option>
//               <option value="oldest">Sort by: Oldest</option>
//             </select>
//           </div>
//         </div>

//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Company</th>
//               <th>Phone</th>
//               <th>Email</th>
//               <th>City</th>
//               <th>Date</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentUsers.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.name}</td>
//                 <td>{user.company.name}</td>
//                 <td>{user.phone}</td>
//                 <td>{user.email}</td>
//                 <td>{user.address.city}</td>
//                 <td>{formatDate(user.date)}</td>
//                 <td>
//                   <button
//                     className={`status-btn ${user.status === "Active" ? "active" : "inactive"}`}
//                     onClick={() => handleStatusToggle(user.id)}
//                   >
//                     {user.status}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="pagination">
//           <div>
//             Showing {indexOfFirst + 1} to{" "}
//             {Math.min(indexOfLast, sorted.length)} of {sorted.length} entries
//           </div>
//           <div className="pages">
//             <button onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>
//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i}
//                 className={currentPage === i + 1 ? "active" : ""}
//                 onClick={() => handlePageChange(i + 1)}
//               >
//                 {i + 1}
//               </button>
//             ))}
//             <button onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// Profile.jsx
import React, { useEffect, useState } from "react";
import "./profile.css";

const Profile = () => {
  const [debtors, setDebtors] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

useEffect(() => {
  const fetchDebtors = async () => {
    try {
      const username = "api";
      const password = "123";
      const encodedCredentials = btoa(`${username}:${password}`);

      const response = await fetch(
        "/demo_nasiya/hs/GPScontrol/apigps/getdebtors?page=1&count=500&branch_id=1",
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${encodedCredentials}`,
          },
          mode: "cors",
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const data = await response.json();
      setDebtors(data.response.debtors);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
      setError(error.message);
    }
  };

  fetchDebtors();
}, []);


  const filtered = debtors.filter((debtor) => {
    const fullName = `${debtor.client.first_name} ${debtor.client.last_name} ${debtor.client.middle_name}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  const sorted = [...filtered].sort((a, b) => {
    const dateA = new Date(a.client.passport_date);
    const dateB = new Date(b.client.passport_date);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const currentItems = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="profile-container">
      <h1>Список должников</h1>
      {error && <p className="error">Ошибка: {error}</p>}

      <div className="controls">
        <input
          type="text"
          placeholder="Поиск по имени..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Отчество</th>
            <th>PINFL</th>
            <th>Сумма долга</th>
            <th>Серия паспорта</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((debtor, index) => (
            <tr key={index}>
              <td>{debtor.client.first_name}</td>
              <td>{debtor.client.last_name}</td>
              <td>{debtor.client.middle_name}</td>
              <td>{debtor.client.pinfl}</td>
              <td>{debtor.contracts[0]?.debt}</td>
              <td>{debtor.client.passport_series}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
          Назад
        </button>
        <span>
          Страница {currentPage} из {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Вперёд
        </button>
      </div>
    </div>
  );
};

export default Profile;
