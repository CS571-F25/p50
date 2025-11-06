export default function Home(props) {
  return (
    <div>
      <h1>Home</h1>
      <p>{props.bio}</p>
      <a href="#/about">Go to About</a>
    </div>
  );
}