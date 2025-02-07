import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import axios from "axios";
import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";

function FormNewChat({ onSubmit }: any) {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    email: "",
  });

  const debouncedSearch = useRef(
    debounce(async (searchFilter: any) => {
      const results = await axios.get(route("v1.admin.getUsers"), {
        params: {
          email: searchFilter,
        },
      });

      if (results.status === 200) {
        if (results.data.data.length > 0) {
          setUsers(results.data.data);
        }
      }
    }, 500)
  ).current;

  useEffect(() => {
    debouncedSearch(filters.email);
  }, [filters]);

  return (
    <div className="mt-8">
      <Input
        className="mb-2"
        placeholder="Search by email"
        onChange={(e) => {
          setFilters({
            ...filters,
            email: e.target.value,
          });
        }}
        value={filters.email}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: any) => (
            <TableRow key={user.id}>
              <TableCell>{user?.user_detail?.full_name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button onClick={() => onSubmit(user.id)}>Chat</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default FormNewChat;
