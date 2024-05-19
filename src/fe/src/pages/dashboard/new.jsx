import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { fs } from "../../config/firebaseInit";
import { MuiFileInput } from "mui-file-input";
import { Button } from "antd";
import axios from "axios";

export default function New() {
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState("Select a group");
  const [file, setFile] = useState(null);

  const createQuiz = useCallback(async () => {
    const { questions } = require("../../testdata/questions.json");

    const { data: roomId } = await axios.post(
      `${process.env.NEXT_PUBLIC_NODE_BACKEND_URL}/group/rooms/create`,
      {
        uid: localStorage.getItem("uid"),
        data: {
          groupId: groups.find((g) => g.name === group).groupId,
          roomData: {
            name: "GDCD",
            desc: "vc",
            diff: 0.2,
            tframe: 25,
            testid: "f25da92b216743e8bee93c9b2781c92d",
            qnum: questions.length,
          },
        },
      }
    );
  }, [group, groups]);

  useEffect(() => {
    async function getGroups() {
      const query = await getDocs(collection(fs, "group"));

      const groups = [];
      query.forEach((doc) => {
        groups.push(doc.data());
      });
      setGroups(groups);
    }

    getGroups();
  }, []);

  return (
    <Stack alignItems="center">
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Create a new quiz
        </Typography>

        <Box sx={{ mb: 2 }}>
          <InputLabel id="group-label">Select a group</InputLabel>
          <Select
            labelId="group-label"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            sx={{ width: "100%" }}
          >
            {groups.map((group) => (
              <MenuItem key={group.groupId} value={group.name}>
                {group.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box>
          <MuiFileInput value={file} onChange={setFile} />
        </Box>

        <Button type="primary" sx={{ mt: 2 }} onClick={createQuiz}>
          Create
        </Button>
      </Box>
    </Stack>
  );
}
