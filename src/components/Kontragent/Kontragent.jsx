import React, { useState, useEffect } from 'react';
import './kontragent.css';

const Kontragent = () => {
  const [users, setUsers] = useState([]);

  // Получить пользователей с API
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      // const response = await fetch('https://dummyjson.com/users');
      const data = await response.json();
      setUsers(data);
      
    } catch (error) {
      console.error('Ошибка при загрузке:', error);
    }
  };

  // Удалить одного пользователя по id
  const deleteUser = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
<div className="kontragentlar">
  <h2>Kontragentlar ruyhati</h2>

  <button onClick={fetchUsers} style={{ marginBottom: '15px' }}>
    Foydalanuvchilarni yuklash
  </button>

  {users.length > 0 ? (
    <div className="user-table-wrapper">
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Ismi</th>
            <th>Tashkilot</th>
            <th>Email</th>
            <th>Telefon</th>
            <th>Xarakat</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.company.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button
                  onClick={() => deleteUser(user.id)}
                  style={{ backgroundColor: 'red', color: 'white' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p>Ruyhat bo'sh</p>
  )}
</div>

  );
};

export default Kontragent;






// import React, { useState, useEffect } from 'react';
// import './kontragent.css';

// const Kontragent = () => {
//   const [users, setUsers] = useState([]);
//   const [editUserId, setEditUserId] = useState(null);
//   const [editForm, setEditForm] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     companyName: ''
//   });

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch('https://jsonplaceholder.typicode.com/users');
//       const data = await response.json();
//       setUsers(data);
//     } catch (error) {
//       console.error('Ошибка при загрузке:', error);
//     }
//   };

//   const deleteUser = (id) => {
//     setUsers(users.filter(user => user.id !== id));
//   };

//   const startEdit = (user) => {
//     setEditUserId(user.id);
//     setEditForm({
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       companyName: user.company.name
//     });
//   };

//   const handleInputChange = (e) => {
//     setEditForm({
//       ...editForm,
//       [e.target.name]: e.target.value
//     });
//   };

//   const saveChanges = (id) => {
//     const updated = users.map(user =>
//       user.id === id
//         ? {
//             ...user,
//             name: editForm.name,
//             email: editForm.email,
//             phone: editForm.phone,
//             company: { ...user.company, name: editForm.companyName }
//           }
//         : user
//     );
//     setUsers(updated);
//     setEditUserId(null);
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div className="kontragentlar">
//       <h2>Список контрагентов</h2>

//       <button onClick={fetchUsers} style={{ marginBottom: '15px' }}>
//         Получить пользователей
//       </button>

//       {users.length > 0 ? (
//         <div className="user-table-wrapper">
//           <table border="1" cellPadding="10">
//             <thead>
//               <tr>
//                 <th>Имя</th>
//                 <th>Компания</th>
//                 <th>Email</th>
//                 <th>Телефон</th>
//                 <th>Действие</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map(user => (
//                 <tr key={user.id}>
//                   {editUserId === user.id ? (
//                     <>
//                       <td>
//                         <input
//                           type="text"
//                           name="name"
//                           value={editForm.name}
//                           onChange={handleInputChange}
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="text"
//                           name="companyName"
//                           value={editForm.companyName}
//                           onChange={handleInputChange}
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="email"
//                           name="email"
//                           value={editForm.email}
//                           onChange={handleInputChange}
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="text"
//                           name="phone"
//                           value={editForm.phone}
//                           onChange={handleInputChange}
//                         />
//                       </td>
//                       <td>
//                         <button onClick={() => saveChanges(user.id)}>Сохранить</button>
//                         <button onClick={() => setEditUserId(null)}>Отмена</button>
//                       </td>
//                     </>
//                   ) : (
//                     <>
//                       <td>{user.name}</td>
//                       <td>{user.company.name}</td>
//                       <td>{user.email}</td>
//                       <td>{user.phone}</td>
//                       <td>
//                         <button
//                           onClick={() => deleteUser(user.id)}
//                           style={{ backgroundColor: 'red', color: 'white', marginRight: '5px' }}
//                         >
//                           Удалить
//                         </button>
//                         <button onClick={() => startEdit(user)}>Изменить</button>
//                       </td>
//                     </>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p>Список пуст.</p>
//       )}
//     </div>
//   );
// };

// export default Kontragent;
