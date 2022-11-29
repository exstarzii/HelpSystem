import React, { useState, useEffect } from "react";
import "./MakeRequestComp.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import FormHelperText from "@mui/material/FormHelperText";

function MakeRequestComp() {
  const [designer, setDesigner] = React.useState("");
  const [documentName, setDocumentName] = React.useState("");
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [helperText, setHelperText] = React.useState("");

  const handleDesigner = (event) => {
    setDesigner(event.target.value);
  };

  const handledocumentName = (event) => {
    setDocumentName(event.target.value);
  };

  const submit = (event) => {
    setHelperText("");
    console.log({
      designer_id: designer,
      name: documentName,
    });
    axios
      .post(process.env.REACT_APP_API_KEY + "/requests", {
        designer_id: designer,
        name: documentName,
      })
      .then(function (response) {
        console.log(response);
        setError(false);
        setHelperText("Заявка подана");
      })
      .catch(function (error) {
        console.log(error);
        setError(true);
        setHelperText(error.message);
      });
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_KEY + "/designers")
      .then(function (response) {
        // handle success
        console.log(response);
        setRows(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setError(error);
        setHelperText("Сервер не доступен");
      });
  }, []);

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
            Заявка на документ
          </Typography>
          <Typography variant="h8" component="div">
            <Link to="/requests">посмотреть заявки</Link>
          </Typography>
        </Box>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            ФИО конструктора
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={designer}
            label="ФИО конструктора"
            onChange={handleDesigner}
            sx={{ marginBottom: "15px" }}
          >
            {rows.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.fio}
              </MenuItem>
            ))}
          </Select>
          <TextField
            onChange={handledocumentName}
            id="outlined-basic"
            label="Наименование документа"
            variant="outlined"
            sx={{ marginBottom: "15px" }}
          />
          <Button variant="contained" size="large" onClick={submit}>
            Отправить
          </Button>
          <FormHelperText
            sx={{ textAlign: "center", color: error ? "red" : "green" }}
          >
            {helperText}
          </FormHelperText>
        </FormControl>
      </Box>
    </Box>
  );
}

MakeRequestComp.propTypes = {};

MakeRequestComp.defaultProps = {};

export default MakeRequestComp;
