import {
    Table,
    Header,
    HeaderRow,
    Body,
    Row,
    HeaderCell,
    Cell,
} from "@table-library/react-table-library/table";

import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useEffect, useState } from "react";

const AdminUsersList = () => {
    const theme = useTheme(getTheme());

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = [
                { id: "1", name: "John Doe", email: "john@example.com" },
                { id: "2", name: "Jane Smith", email: "jane@example.com" },
                { id: "3", name: "Alice Brown", email: "alice@example.com" },
            ];
            setUsers(response);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
    );

    const data = { nodes: filteredUsers };

    return (
        <div className="w-screen sm:m-2 p-4 bg-white sm:w-1/2">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
                Users List
            </h1>

            {/* Search Bar & Add User Button */}
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search users..."
                    className="p-2 border border-gray-300 focus:outline-none sm:w-1/3 w-2/3 max-w-52s"
                />
                <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition">
                    Add User
                </button>
            </div>

            {/* User Table */}
            <Table data={data} theme={theme}>
                {(tableList) => (
                    <>
                        <Header>
                            <HeaderRow className="bg-gray-800 text-white">
                                <HeaderCell className="p-3 border">
                                    Name
                                </HeaderCell>
                                <HeaderCell className="p-3 border">
                                    Email
                                </HeaderCell>
                            </HeaderRow>
                        </Header>

                        <Body>
                            {tableList.length > 0 ? (
                                tableList.map((user) => (
                                    <Row
                                        key={user.id}
                                        item={user}
                                        className="border hover:bg-gray-100 transition duration-200"
                                    >
                                        <Cell className="p-3 border">
                                            {user.name}
                                        </Cell>
                                        <Cell className="p-3 border">
                                            {user.email}
                                        </Cell>
                                    </Row>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="p-4 text-center text-gray-500"
                                    >
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </Body>
                    </>
                )}
            </Table>
        </div>
    );
};

export default AdminUsersList;
