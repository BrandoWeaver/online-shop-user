// Import statements
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// Interface for Language
interface Language {
  code: string;
  name: string;
  flag: string;
}

// Styles with theme

// LanguageSelectionDialog component with props
interface LanguageSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  selectedLanguage: string;
  onSelectLanguage: (code: string) => void;
}

const LanguageSelectionDialog: React.FC<LanguageSelectionDialogProps> = ({
  open,
  onClose,
  selectedLanguage,
  onSelectLanguage,
}) => {
  const languages: Language[] = [
    // Array of languages with types
    {
      code: "km",
      name: "ភាសាខ្មែរ",
      flag: "https://restcountries.com/v3.1/all/khm/flag",
    },
    {
      code: "en",
      name: "English",
      flag: "https://restcountries.com/v3.1/all/usa/flag",
    },
  ];

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>
        Select Language
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <List>
          {languages.map((language) => (
            <ListItem
              button
              onClick={() => onSelectLanguage(language.code)}
              key={language.code}
            >
              <ListItemIcon>
                <img src={language.flag} alt={`${language.name} flag`} />
              </ListItemIcon>
              <ListItemText primary={language.name} />
              {selectedLanguage === language.code && <CheckCircleIcon />}
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageSelectionDialog;
