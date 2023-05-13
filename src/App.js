import './App.css';
import ExampleArrayOfObjectsInReact from './Arrayofobjectsinreact';
import ExampleControlledComponentsCheckboxes from './Checkbox';
import ExampleFetchingInitialState from './Fetchinitialstate';

function App() {
  return (
    <div>
      <h1> Guest List</h1>
      <ExampleControlledComponentsCheckboxes />
      <ExampleFetchingInitialState />
      <ExampleArrayOfObjectsInReact />
    </div>
  );
}

export default App;
