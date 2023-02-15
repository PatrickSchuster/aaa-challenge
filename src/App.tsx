import React from "react";
import {
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
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
  CircularProgress,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SortIcon from "@mui/icons-material/Sort";
import { IClub } from "./interfaces/club";
import { TFunction } from "i18next";
import Details from "./components/Details";

interface IProps {
  t: TFunction;
}

interface IState {
  clubs: Map<string, IClub>;
  isLoading: boolean;
  hasError: boolean;
  sortByNameDesc: boolean;
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      clubs: new Map([]),
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
          clubs: this.clubsMap(json),
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          hasError: true,
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  }

  clubsMap(clubsArray: Array<IClub>) {
    const map = new Map<string, IClub>();
    clubsArray.forEach((club: IClub) => {
      map.set(club.id, club);
    });
    return map;
  }

  assembleList() {
    const { t } = this.props;
    const sorted =
      this.state.sortByNameDesc === true
        ? [...this.state.clubs.values()].sort((club1, club2) =>
            club1.name.localeCompare(club2.name)
          )
        : [...this.state.clubs.values()].sort(
            (club1, club2) => club2.value - club1.value
          );
    if (this.state.isLoading === true) {
      return (
        <div className="loading-wrapper">
          <CircularProgress />
        </div>
      );
    }
    return sorted.map((club) => {
      return (
        <Link to={`details/${club.id}`} key={club.id} className="link">
          <ListItem className="list-item">
            <ListItemAvatar>
              <Avatar alt={`Logo of ${club.name}`} src={club.image}></Avatar>
            </ListItemAvatar>
            {this.assembleListItemText(club)}
          </ListItem>
        </Link>
      );
    });
  }

  assembleListItemText(club: IClub) {
    const { t } = this.props;
    const primary = <Box sx={{ fontWeight: "bold" }}>{t(club.name)}</Box>;
    const secondary = (
      <Typography component={"span"}>
        <Box component="span" sx={{ fontWeight: "bold" }}>
          {t(club.country.toLowerCase())}
        </Box>
        <Box component="span"> </Box>
        <Box component="span">
          {club.value} {t("million")} Euro
        </Box>
      </Typography>
    );
    return (
      <Typography component={"span"}>
        <ListItemText primary={primary} secondary={secondary} />
      </Typography>
    );
  }

  toggleSortOrder() {
    this.setState({
      sortByNameDesc: !this.state.sortByNameDesc,
    });
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
    const list = (
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
              <SortIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {this.state.hasError === true ? (
          <div className="error-wrapper">
            💣 🧨 Something went wrong ... 💥💥
          </div>
        ) : (
          <List>{this.assembleList()}</List>
        )}
      </ThemeProvider>
    );

    const view = (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={list} />
          <Route
            path="details/:id"
            element={<Details theme={theme} clubs={this.state.clubs} />}
          />
        </Routes>
      </BrowserRouter>
    );
    return view;
  }
}

export default withTranslation()(App);
