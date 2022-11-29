import React, { useState, useEffect } from "react";
import "./RequestsComp.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import axios from "axios";

function RequestsComp() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_KEY + "/requests")
      .then(function (response) {
        // handle success
        console.log(response);
        setIsLoaded(true);
        function compareNumeric(a, b) {
          if (a.count < b.count) return 1;
          if (a.count == b.count) return 0;
          if (a.count > b.count) return -1;
        }
        response.data.sort(compareNumeric);
        setRows(response.data);
      })
      .catch(function (error) {
        // handle error
        setIsLoaded(true);
        console.log(error);
        setError(error);
      });
  }, []);

  if (error) {
    return (
      <Box
        sx={{
          display: "grid",
          height: "100vh",
          gridAutoFlow: "row",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "350px",
            padding: "5px",
            justifySelf: "center",
            alignItems: "center",
          }}
        >
          <div>Error: {error.message}</div>
        </Box>
      </Box>
    );
  } else if (!isLoaded) {
    return (
      <Box
        sx={{
          display: "grid",
          height: "100vh",
          gridAutoFlow: "row",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "350px",
            padding: "5px",
            justifySelf: "center",
            alignItems: "center",
          }}
        >
          <div>Loading...</div>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          display: "grid",
          height: "100vh",
          gridAutoFlow: "row",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "350px",
            padding: "5px",
            justifySelf: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ paddingBottom: "15px", textAlign: "center" }}>
            <Typography variant="h5" component="div">
              Заявки на документы
            </Typography>
            <Typography variant="h8" component="div">
              <Link to="/makerequest">подать заявку</Link>
            </Typography>
          </Box>
          <TableContainer className="RequestsComp" component={Paper}>
            <Table aria-label="simple table" title="Employee List">
              <TableHead>
                <TableRow>
                  <TableCell>Наименование документа</TableCell>
                  <TableCell align="right">Кол-во заявок</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row._id}
                    </TableCell>
                    <TableCell align="right">{row.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    );
  }
}

RequestsComp.propTypes = {};

RequestsComp.defaultProps = {};

export default RequestsComp;
