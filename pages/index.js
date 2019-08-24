import ValidateCharity from '../components/validate';

let status = ValidateCharity('CC49286');
console.log(status);
const Index = () => (
  

  <div>
    <p>Hello Next.js</p>
    <p>{status}</p>
  </div>
);

export default Index;