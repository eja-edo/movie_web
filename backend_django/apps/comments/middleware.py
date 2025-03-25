const MyContext = React.createContext();

function App() {
  return (
    <MyContext.Provider value="Hello World">
      <Child />
    </MyContext.Provider>
  );
}

function Child() {
  const value = React.useContext(MyContext);
  return <div>{value}</div>;
}