import {
  AppBar,
  IconButton,
  ThemeOptions,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { IClub } from "../interfaces/club";

interface IProps {
  clubs: Map<string, IClub>;
  theme: ThemeOptions;
}

export default function Details(props: IProps) {
  const navigate = useNavigate();
  const { id } = useParams();

  console.log("id = ", id);

  function toolBar(header: string) {
    return (
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => navigate("/")}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            data-testid="header"
          >
            {header}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }

  if (id === undefined || props.clubs.has(id) === false) {
    return (
      <ThemeProvider theme={props.theme}>
        {toolBar("Club not found ❌")}
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={props.theme}>
      {toolBar(props.clubs.get(id)!.name)}
      <summary className="club-details">
        <div className="image-container">
          <div className="country">
            <strong>{props.clubs.get(id)!.country}</strong>
          </div>
          <img src={props.clubs.get(id)!.image}></img>
        </div>
        <div className="text-container">
          <p>
            Der Club <strong>{props.clubs.get(id)!.name}</strong> aus{" "}
            {props.clubs.get(id)!.country} hat einen Wert von{" "}
            {props.clubs.get(id)!.value} Millionen Euro.
          </p>
          <p>
            <strong>{props.clubs.get(id)!.name}</strong> konnte bislang{" "}
            {props.clubs.get(id)!.european_titles} Siege auf europäischer Ebene
            erreichen.
          </p>
        </div>
      </summary>
    </ThemeProvider>
  );
}
