import Routes from "./routes";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import SideMenuContextProvider from "./context/SideMenuContext";
import CalendarContextProvider from "./context/CalendarContext";
import InfoContextProvider from "./context/InfoContext";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3f51b5",
      },
      secondary: {
        main: "#2196f3",
      },
      error: {
        main: "#f44336",
      },
      background: {
        main: "#f4f8fb",
        dark: "#202634",
        lightDark: "#293042",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <SideMenuContextProvider>
        <CalendarContextProvider>
          <InfoContextProvider>
            <Routes />
          </InfoContextProvider>
        </CalendarContextProvider>
      </SideMenuContextProvider>
    </ThemeProvider>
  );
}

export default App;