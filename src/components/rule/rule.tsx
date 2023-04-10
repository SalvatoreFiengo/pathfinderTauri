import { Action } from "../../interfaces";
import "./rule.css";
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ChangeEvent, useState } from "react";
import { MainGrid } from "../mainGrid/mainGrid";
import { useFirebase } from "../../api/firebaseSettings";

export const Rule = () => {
  const [ruletype] = useFirebase();
  const [filter, setFilter] = useState("");
  const [traitFilter, setTraitFilter] = useState("");
  const [ruleId, setRuleId] = useState<string>();

  const handleNameFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.currentTarget.value);
  };

  const handleTraitsFilter = (event: SelectChangeEvent) => {
    setTraitFilter(event.target?.value);
  };

  const handleTraitClick = (value: string) => {
    setTraitFilter(value);
  };

  const handleRuleTitleClick = (id: string) => {
    setRuleId(ruleId ? undefined : id);
  };

  return (
    <Box className="backgroundImage">
      {!ruletype && (
        <Box
          sx={{
            width: "200px",
            height: "100px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            margin: "0 auto",
            position: "absolute",
            top: "calc(50% - 50px)",
            left: "calc(50% - 100px)",
          }}
        >
          <h1>Loading...</h1>
        </Box>
      )}

      {ruletype && (
        <Box
          sx={{
            width: "80%",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            margin: "50px auto 20px auto",
          }}
        >
          <Stack
            direction="row"
            spacing={20}
            justifyContent="center"
            alignItems="center"
            pb={2}
          >
            <Stack direction="row" alignItems="center">
              <TextField
                id="standard-basic"
                label="Search by name"
                variant="outlined"
                onChange={handleNameFilter}
                value={filter}
                sx={{ m: 1, backgroundColor: "#fff" }}
              />
              <IconButton
                size="small"
                onClick={() => setFilter("")}
                sx={{ backgroundColor: "#fff" }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack direction="row" alignItems="center">
              <FormControl
                variant="outlined"
                sx={{ m: 1, minWidth: 120, backgroundColor: "#fff" }}
              >
                <InputLabel id="traits-select-label">Traits</InputLabel>
                <Select
                  labelId="traits-select-label"
                  id="traits-select"
                  value={traitFilter}
                  label="Traits"
                  onChange={handleTraitsFilter}
                >
                  <MenuItem value={""}>
                    <Typography>traits</Typography>
                  </MenuItem>
                  {(ruletype as Action[])?.map((rule) =>
                    rule.traits?.map((trait, i) => (
                      <MenuItem key={i} value={trait}>
                        <Typography fontSize={12}>{trait}</Typography>
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
              <IconButton
                size="small"
                onClick={() => setTraitFilter("")}
                sx={{ backgroundColor: "#fff" }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
          <Divider />
          <MainGrid
            rules={(ruletype as Action[])
              ?.map(({ id, name, category, traits }) => ({
                id,
                name,
                category,
                traits,
              }))
              .filter(
                ({ name, traits }) =>
                  name.toLowerCase().includes(filter) &&
                  traits.some((trait) => trait.includes(traitFilter))
              )}
            filter={filter}
            onClickRule={handleRuleTitleClick}
          />
        </Box>
      )}
    </Box>
  );
};
