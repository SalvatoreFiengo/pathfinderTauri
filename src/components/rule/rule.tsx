import { Action } from "../../interfaces"
import './rule.css';
import { Divider, List, TextField, Typography } from "@mui/material";
import { FixedSizeList } from 'react-window';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useRef, useState } from "react";

export const Rule = ({ruletype}: {ruletype: Action[] | []}) => {
  const boxRef = useRef<HTMLDivElement>();
  const [boxSize, setBoxSize] = useState(0);
  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.addEventListener('resize', getBoxSize);
      if(!boxSize){
        getBoxSize();
      }
    }
    return () => boxRef.current?.removeEventListener('resize', getBoxSize);
  })
  const getBoxSize = () => {
    if(boxRef.current){
      setBoxSize(boxRef.current?.clientWidth);
    }
  }
  return (
    <>
      {ruletype.length === 0 && <h1>Loading...</h1>}

      {ruletype.length > 0 && (
        <Box ref={boxRef}>
          <TextField id="standard-basic" label="Rule Search" variant="standard" />
          <List>
          {ruletype.map((rule) => (
            <Box key={rule.id} sx={{marginBottom: '128px'}}>
              <ListItem style={{flexDirection: 'column'}} component="div" disablePadding>
                <ListItemText>
                  <Typography variant="h2" component="h2">{rule.name}</Typography>
                </ListItemText>
                <ListItemText>
                  <Typography dangerouslySetInnerHTML={{__html: rule.description}} />
                </ListItemText>
              </ListItem>
              <Divider />
            </Box>
          ))}
          </List>
        </Box>
        )
      }
    </>
  );
}