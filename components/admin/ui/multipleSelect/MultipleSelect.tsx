import React, { FC, use, useEffect, useState } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Benefit, Benefits, IService, Services } from "fleed/interfaces";
import { Controller, useFormContext } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import { comparatorArray } from "fleed/utils/arrayComparator";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(id: number, benefitsIds: readonly Benefits[], theme: Theme) {
  return {
    fontWeight:
      benefitsIds.findIndex((benefit) => benefit.benefit.id === id) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

type Props = {
  list: Benefit[] | undefined | IService[];
  itemList?: Benefit[] | IService[];
  name : string
};

const MultipleSelect: FC<Props> = ({ list = [], itemList = [] ,name}) => {
  const theme = useTheme();
  const [listIds, setListIdS] = React.useState<Benefit[] | IService[]>(itemList);
  const [ listCharged , setListCharged ] = useState<Benefit[] | IService[]>([])
  const { register, control, setValue ,getValues} = useFormContext();
  

  const handleChange = (event: SelectChangeEvent<Benefit[] | IService[]>) => {
    const {
      target: { value },
    } = event;
       setListIdS(value as any);
      setValue(name, value)

  };
 
   useEffect(() => {
      
    setListCharged(comparatorArray(list,listIds))
       
   }, [list,listIds])
   

  return (
    <div>
     
      <FormControl sx={{ m: 1, width: '100%' }}>
        <InputLabel id="demo-multiple-chip-label">{name}</InputLabel>
        <Select
          {...register(name)}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={listIds}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={name} />}
          renderValue={(selected :Benefit[] | IService[]) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value.id} label={value.name} onDelete={() =>{
                  const newValues = listIds.filter((item) => item !== value) as Benefit[]
                  setListIdS(
                   newValues
                  )
                  setValue(name,newValues)
                }
                }
                deleteIcon={
                  <CancelIcon
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                } />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {listCharged?.map((benefit) => (
            <MenuItem
              key={benefit.id}
              // disabled={benefitsIds.includes(benefit)}
              // value={benefit.id}
              value={benefit as any}
              
              // style={getStyles(benefit.id, benefitsIds, theme)}
            >
              {benefit.name}
              {/* {benefitsIds.includes(benefit) ? <CheckIcon color="info" /> : null} */}
            
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelect;
