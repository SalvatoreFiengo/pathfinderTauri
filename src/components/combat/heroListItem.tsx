import {
  ListItem,
  Checkbox,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { useRecoilState, useSetRecoilState } from "recoil";
import { HeroType, heroSelectedState, openHeroDialogState } from "./heroAtoms";

type Props = { hero: HeroType };

export const HeroListItem = ({ hero }: Props) => {
  const { id, name, enemy, initiative } = hero;
  const setOpenHeroDialog = useSetRecoilState(openHeroDialogState);
  const setSelectedHero = useSetRecoilState(heroSelectedState);
  const handleHeroClick = () => {
    setSelectedHero(hero);
    setOpenHeroDialog(true);
  };
  return (
    <>
      <ListItem
        sx={{ border: "1px solid background.paper", borderRadius: "8px" }}
        key={id}
        secondaryAction={
          <Checkbox
            edge="end"
            checked
            inputProps={{ "aria-labelledby": `hero-${id}` }}
          />
        }
        disablePadding
      >
        <ListItemButton onClick={handleHeroClick}>
          <ListItemAvatar>
            <Avatar>{name ? name.substring(0, 1) : "n/a"}</Avatar>
          </ListItemAvatar>
          <ListItemText
            id={`label-${id}`}
            primary={name}
            secondary={`initiative: ${initiative}`}
          />
        </ListItemButton>
      </ListItem>
    </>
  );
};
