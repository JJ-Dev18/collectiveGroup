import { useState , useRef, useReducer,useEffect, FC} from 'react';
// @mui
import { styled } from '@mui/material/styles';
import {  Slide, Button, IconButton, 
   ClickAwayListener,MenuItem ,Typography,
  ListItemIcon,Icon,ListItemText,Popper,Paper
} from '@mui/material';
// utils
import { bgBlur } from '../../../../utils/cssStyles';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import _ from 'lodash';
// component
import SearchIcon from '@mui/icons-material/Search';
import Autosuggest from 'react-autosuggest';
import { useRouter } from 'next/router';
// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledSearchbar = styled('div')(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: HEADER_MOBILE,
  padding: theme.spacing(0, 3),
  
  [theme.breakpoints.up('md')]: {
    height: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

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

const SearchBar:FC<Props> = ({navigation})=>  {
  const [open, setOpen] = useState(false);
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
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const autosuggestProps = {
    // renderInputComponent,
    highlightFirstSuggestion: true,
    suggestions: state.suggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    onSuggestionSelected: handleSuggestionSelected,
    getSuggestionValue,
    renderSuggestion,
  };
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        {!open && (
          <IconButton onClick={handleOpen} sx={{color : 'white'}}>
            <SearchIcon />
          </IconButton>
        )}

        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <StyledSearchbar>
          <Autosuggest
                  
                  {...autosuggestProps}
                  inputProps={{
                    placeholder: 'Search ...',
                    value: state.searchText,
                    onChange: handleChange as any,
                   
                    autoFocus: true,
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
            {/* <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            /> */}
            <Button variant="contained" onClick={handleClose}>
              Search
            </Button>
          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}

export default SearchBar