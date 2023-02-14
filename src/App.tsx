import React from "react";
import "./App.css";
import { withTranslation } from "react-i18next";
import {
  AppBar,
  Box,
  Toolbar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SortIcon from "@mui/icons-material/Sort";
import { IClub } from "./interfaces/club";
import { TFunction } from "i18next";

interface IProps {
  t: TFunction;
}

interface IState {
  clubs: Set<IClub>;
  isLoading: boolean;
  hasError: boolean;
  sortByNameDesc: boolean
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      clubs: new Set(),
      isLoading: false,
      hasError: false,
      sortByNameDesc: true,
    };
  }

  BASE_URL = new URL("https://public.allaboutapps.at/hiring/clubs.json");

  componentDidMount() {
    this.fetchClubs();
  }

  fetchClubs() {
    this.setState({
      isLoading: true,
    });
    fetch(this.BASE_URL)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          clubs: new Set(json),
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          hasError: true,
        });
      })
      .finally(() => {
        this.setState(
          {
            isLoading: false,
          },
          () => {
            console.log(this.state.clubs);
          }
        );
      });
  }

  assembleList() {
    const { t } = this.props
    const sorted = this.state.sortByNameDesc === true ?
      [...this.state.clubs].sort((club1,club2) => club1.name.localeCompare(club2.name)) :
      [...this.state.clubs].sort((club1, club2) => club2.value - club1.value)
    return sorted.map((club) => {
      return (
        <ListItem key={club.id} className="list-item">
          <ListItemAvatar>
            <Avatar alt={`Logo of ${club.name}`} src={ club.image }>
            </Avatar>
          </ListItemAvatar>
          { this.assembleListItemText(club)}
        </ListItem>
      );
    });
  }

  assembleListItemText(club: IClub) {
    const { t } = this.props;
    const primary =  <Box sx={{ fontWeight: 'bold' }}>{ t(club.name) }</Box>
    const secondary = (
      <Typography component={'span'}>
        <Box component="span" sx={{ fontWeight: 'bold' }}>{ t(club.country) }</Box>
        <Box component="span"> </Box>
        <Box component="span">{ club.value } {t("million")} Euro</Box>
      </Typography>
    )
    return (<Typography component={'span'}>
      <ListItemText primary={primary} secondary={secondary} />
    </Typography>)
  }

  toggleSortOrder() {
    this.setState({
      sortByNameDesc: !this.state.sortByNameDesc
    })
  }

  render() {
    const { t } = this.props;
    this.assembleList();
    const theme = createTheme({
      palette: {
        primary: {
          main: "#01C13B",
          contrastText: "#fff",
        },
      },
    });
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <AppBar position="sticky">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                all about clubs
              </Typography>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => this.toggleSortOrder()}
              >
                <SortIcon/>
              </IconButton>
            </Toolbar>
          </AppBar>
          <List>{this.assembleList()}</List>
        </ThemeProvider>
      </div>
    );
  }
}

export default withTranslation()(App);
