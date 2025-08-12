import styled from './Loader.module.css';

type LoaderProps = {
  isLoading: boolean;
};

const Loader = ({ isLoading }: LoaderProps) => {

  //if isLoading containing false then return null/or render nothing 
  if (!isLoading) return null;

//else show the loader 
  return <div className={styled.Loader}></div>;
};

export default Loader;
