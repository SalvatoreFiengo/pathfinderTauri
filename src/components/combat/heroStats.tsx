import { useRecoilState } from "recoil";
import {
  heroInfoState,
  heroSelectedState,
  herolistState,
  openHeroDialogState,
} from "./heroAtoms";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useRef } from "react";

export const HeroStatsDialog = () => {
  const [herolist, setHerolist] = useRecoilState(herolistState);
  const [selectedHero, setSelectedHero] = useRecoilState(heroSelectedState);
  const [heroInfo, setHeroInfo] = useRecoilState(heroInfoState);
  const [openHeroDialog, setOpenHeroDialog] =
    useRecoilState(openHeroDialogState);
  const handleDialogClose = () => {
    setOpenHeroDialog(false);
  };
  const heroNameRef = useRef<HTMLInputElement>(null);
  const heroInitiativeRef = useRef<HTMLInputElement>(null);
  const handleSaveHero = () => {
    const heroName = heroNameRef.current?.value;
    const heroInitiative = heroInitiativeRef.current?.value
      ? parseInt(heroInitiativeRef.current?.value, 10)
      : 0;
    let newList = [...herolist];
    if (selectedHero) {
      const hero = {
        ...selectedHero,
        name: heroName,
        initiative: heroInitiative,
        id: selectedHero.id,
      };
      const found = newList.find(({ id }) => id === selectedHero.id);
      if (found && hero) {
        newList.splice(newList.indexOf(found), 1, hero);
      }
      setSelectedHero(undefined);
    } else {
      const newHero = {
        ...heroInfo,
        id: herolist.length + 1,
        name: heroName,
        initiative: heroInitiative,
      };
      newList = [...herolist, newHero];
      setHeroInfo(undefined);
    }
    setHerolist(newList);
    handleDialogClose();
  };
  return (
    <Dialog open={openHeroDialog} onClose={handleDialogClose}>
      <DialogTitle>Hero Details</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="hero-name"
            name="name"
            inputRef={heroNameRef}
            label={`${selectedHero?.enemy ? "Enemy" : "Hero"} name`}
            defaultValue={selectedHero?.name || ""}
            variant="standard"
          />
          <TextField
            id="selectedHero-initiative"
            label="initiative"
            inputRef={heroInitiativeRef}
            name="initiative"
            defaultValue={selectedHero?.initiative || 0}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />
          {selectedHero?.conditions ? (
            selectedHero.conditions.map(({ condition, value }) => (
              <TextField
                id={`condition-${condition}`}
                label={condition}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={value}
                variant="standard"
              />
            ))
          ) : (
            <TextField
              id="add-condition"
              label="Conditions"
              defaultValue=""
              name="conditions"
              variant="standard"
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button onClick={handleSaveHero}>
          {selectedHero !== undefined ? "Edit" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
