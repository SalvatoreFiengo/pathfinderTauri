import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { HeroListItem } from "./heroListItem";
import { herolistState, openHeroDialogState } from "./heroAtoms";
import { HeroStatsDialog } from "./heroStats";

export const InitiativeList = () => {
  const herolist = useRecoilValue(herolistState);
  const setOpenHeroDialog = useSetRecoilState(openHeroDialogState);

  return (
    <>
      <List
        dense
        sx={{
          width: "fit-content",
          minWidth: 360,
          bgcolor: "background.paper",
          margin: "56px auto 16px auto",
        }}
      >
        {herolist.length < 1 ? (
          <ListItem
            sx={{ border: "1px solid background.paper", borderRadius: "8px" }}
          >
            <ListItemAvatar>
              <Avatar>n/a</Avatar>
            </ListItemAvatar>
            <ListItemText
              id="default"
              primary="No hero added"
              secondary="Try add some more heroes"
            />
          </ListItem>
        ) : (
          <>
            {herolist
              .slice()
              .sort((a, b) => (b.initiative > a.initiative ? 1 : -1))
              .map((hero) => (
                <HeroListItem hero={hero} key={hero.id} />
              ))}
          </>
        )}
        <ListItem>
          <ListItemButton onClick={() => setOpenHeroDialog(true)}>
            Add Hero
          </ListItemButton>
        </ListItem>
      </List>

      <HeroStatsDialog />
    </>
  );
};
