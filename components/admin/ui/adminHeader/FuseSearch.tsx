import React, { FC, useEffect,useReducer,useRef } from 'react'
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { styled } from '@mui/material/styles';
import Autosuggest from 'react-autosuggest';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import _ from 'lodash';
import {  useRouter } from 'next/router';
import { Icon,Input} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const Root = styled('div')(({ theme }) => ({
  '& .FuseSearch-container': {
    position: 'relative',
  },

  '& .FuseSearch-suggestionsContainerOpen': {
    position: 'absolute',
    marginTop: theme.spacing(),
    left: 0,
    right: 0,
    zIndex : 99999,
  },

  '& .FuseSearch-suggestion': {
    display: 'block',
  },

  '& .FuseSearch-suggestionsList': {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },

  '& .FuseSearch-input': {
    transition: theme.transitions.create(['background-color'], {
      easing: theme.transitions.easing.easeInOut,
      duration: '5s',
    }),
 
  },
}));

function renderInputComponent(inputProps:any) {

  return (
    <div className="w-full relative">  
          <Input
          {...inputProps}
            fullWidth  
            disableUnderline
            sx={{padding: '10px', zIndex : 99999,}}
          />
     
    </div>
  );
}

function renderSuggestion(suggestion:Suggestion, { query, isHighlighted } : {query : string , isHighlighted : boolean}) {
  const matches = match(suggestion.title, query);
  const parts = parse(suggestion.title, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <ListItemIcon className="min-w-40">
        {suggestion.icon ? (
          <Icon>{suggestion.icon}</Icon>
        ) : (
          <span className="text-20 w-24 font-semibold uppercase text-center">
            {suggestion.title[0]}
          </span>
        )}
      </ListItemIcon>
      <ListItemText
        primary={parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 600 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          )
        )}
      />
    </MenuItem>
  );
}
interface Suggestion {
  title : string ,
  path : string ,
  icon : JSX.Element,
}

function getSuggestions(value:string, data:Suggestion[]) {
    const inputValue = _.deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
  
    return inputLength === 0
      ? []
      : data.filter((suggestion:Suggestion) => {
          const keep = count < 10 && match(suggestion.title, inputValue).length > 0;
  
          if (keep) {
            count += 1;
          }
  
          return keep;
        });
  }

  function getSuggestionValue(suggestion:Suggestion) {
    return suggestion.title;
  }

interface InitialState {
    searchText : string,
    search : boolean ,
    navigation : Suggestion[]
    suggestions : Suggestion[]
    noSuggestions: boolean
    opened : boolean
}


type ActionSearch = 
   | { type: 'open'} 
   | { type: 'close' } 
   | { type: 'setSearchText' , payload : string} 
   | { type: 'setNavigation' , payload : Suggestion[] } 
   | { type: 'updateSuggestions', payload : string } 
   | { type: 'clearSuggestions' } 

  
   
  
  function reducer(state:InitialState, action:ActionSearch): InitialState  {
    switch (action.type) {
      case 'open': {
        return {
          ...state,
          opened: true,
        };
      }
      case 'close': {
        return {
          ...state,
          opened: false,
          searchText: '',
        };
      }
      case 'setSearchText': {
        return {
          ...state,
          searchText: action.payload,
        };
      }
      case 'setNavigation': {
        return {
          ...state,
          navigation: action.payload,
        };
      }
      case 'updateSuggestions': {
        const suggestions = getSuggestions(action.payload, state.navigation);
        const isInputBlank = action.payload.trim() === '';
        const noSuggestions = !isInputBlank && suggestions.length === 0;
  
        return {
          ...state,
          suggestions,
          noSuggestions,
        };
      }
      case 'clearSuggestions': {
        return {
          ...state,
          suggestions: [],
          noSuggestions: false,
        };
      }
     
      default: {
        throw new Error();
      }
    }
  }
  const initialState = {
    searchText: '',
    search: false,
    navigation: [],
    suggestions: [],
    noSuggestions: false,
    opened : false 
  };
type Props = {
  navigation : Suggestion[]
}
const FuseSearch:FC<Props> = ({navigation}) =>  {
    // const { navigation } = props;
  
    const [state, dispatch] = useReducer(reducer, initialState);
    const router = useRouter()
    const suggestionsNode =useRef<HTMLInputElement >(null);
    const popperNode = useRef<HTMLInputElement>(null);
    const buttonNode = useRef<HTMLInputElement>(null);
  
    useEffect(() => {
      dispatch({
        type: 'setNavigation',
        payload: navigation,
      });
    }, [navigation]);
  
    function showSearch(event: React.MouseEvent<HTMLElement, MouseEvent>  ) {
      event.stopPropagation();
      dispatch({ type: 'open' });
      document.addEventListener('keydown', escFunction as any , false);
    }
  
    function hideSearch() {
      dispatch({ type: 'close' });
      document.removeEventListener('keydown', escFunction as any, false);
    }
  
    function escFunction(event: React.KeyboardEvent<HTMLElement>) {
      if (event.keyCode === 27) {
        hideSearch();
      }
    }
  
    function handleSuggestionsFetchRequested({ value }:{value : string}) {
      dispatch({
        type: 'updateSuggestions',
        payload : value ,
      });
    }
  
    function handleSuggestionSelected(event: React.FormEvent<any> , { suggestion } : {suggestion : Suggestion}) {
      event.preventDefault();
      event.stopPropagation();
      if (!suggestion.path) {
        return;
      }
      
      router.push(suggestion.path)
      hideSearch();
    }
  
    function handleSuggestionsClearRequested() {
      dispatch({
        type: 'clearSuggestions',
      });
    }
  
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      dispatch({
        type: 'setSearchText',
        payload: event.target.value,
      });
    }
  
    function handleClickAway(event:  MouseEvent | TouchEvent) {
      return (
        state.opened &&
        (!suggestionsNode.current || !suggestionsNode.current.contains(event.target as any)) &&
        hideSearch()
      );
    }
    const autosuggestProps = {
      renderInputComponent,
      highlightFirstSuggestion: true,
      suggestions: state.suggestions,
      onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: handleSuggestionsClearRequested,
      onSuggestionSelected: handleSuggestionSelected,
      getSuggestionValue,
      renderSuggestion,
    };
  
    return(
        <Root  >
        <Tooltip title="Click to search" placement="bottom">
          <div
            onClick={showSearch}
            onKeyDown={showSearch as any}
            role="button"
            tabIndex={0}
            ref={buttonNode}
          >
           <IconButton  sx={{color : 'white'}}>
            <SearchIcon />
          </IconButton>
          </div>
        </Tooltip>
       
        {state.opened && (
          <ClickAwayListener onClickAway={handleClickAway}>
            <Paper className="absolute left-0 right-0 top-0 h-full w-full z-9999 shadow-0" square>
              <div className="flex items-center w-full h-full " ref={popperNode}>
                <Autosuggest
                  
                  {...autosuggestProps}
                  inputProps={{
                    placeholder: 'Search ...',
                    value: state.searchText,
                    onChange: handleChange as any,
                    
                    // autoFocus: true,
                  }}
                  theme={{
                    container: 'flex flex-1 w-full',
                    suggestionsList: 'FuseSearch-suggestionsList',
                    suggestion: 'FuseSearch-suggestion',
                  }}
                  renderSuggestionsContainer={(options) => (
                    <Popper
                      anchorEl={popperNode.current}
                      open={Boolean(options.children) || state.noSuggestions}
                      // popperOptions={}
                      // popperOptions={{ positionFixed: true }}
                      className="z-9999"
                    >
                      <div ref={suggestionsNode}>
                        <Paper
                          square
                          {...options.containerProps}
                          style={{
                            width: popperNode.current ? popperNode.current.clientWidth : '',
                          }}
                        >
                          {options.children}
                          {state.noSuggestions && (
                            <Typography className="px-16 py-12">No results..</Typography>
                          )}
                        </Paper>
                      </div>
                    </Popper>
                  )}
                />
                <IconButton onClick={hideSearch} className="mx-8" size="large">
                  <CloseIcon/>
                </IconButton>
              </div>
            </Paper>
          </ClickAwayListener>
        )}
      </Root>
    )
   

}
  

export default FuseSearch