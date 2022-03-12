import { useNavigate, useParams } from "react-router-dom";

export const withParmans = (Component) => {
  const Comp = (props) => {
    return <Component {...props} params={useParams()} />;
  };
  return Comp;
};

export const withNavigation = (Component) => {
  const Comp = (props) => {
    return <Component {...props} params={useNavigate()} />;
  };
  return Comp;
};
