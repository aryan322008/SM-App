import React,{useState} from 'react';
import useStyles from "./styles"
import {AppBar,TextField, Button} from "@material-ui/core";
import ChipInput from 'material-ui-chip-input'
import { useDispatch } from "react-redux";
import {postSearch} from "../../states/actions/post-actions"


const Search = () => {
    const classes = useStyles();
   const dispatch = useDispatch()
   const [searchText, setSearchText] = useState("");
   const [tags, setTags] = useState([]);

    const handleKeyPress = (e) => {
      if(e.keyCode === 13){
        searchPost()
      }
    }

    const searchPost = () => {
      dispatch(postSearch({search:searchText,tags:tags}))
    }

    const handleAddChip = (chip) => {
      setTags([...tags,chip])

    }

    const handleDeleteChip = (chip) => {
     const filteredTags = tags.filter((element)=>{return chip !== element})
      setTags(filteredTags)
    }



    return (
        <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField 
              onKeyDown={handleKeyPress} 
              name="search" variant="outlined" label="Search Memories" fullWidth 
              value={searchText} 
              onChange={(e) => setSearchText(e.target.value)} 
              />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button
               onClick={searchPost}
               className={classes.searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>
    );
}

export default Search;
