import styled from "styled-components";

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #ddd;
  height: 20px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background-color: #4caf50; /* Green color for the progress */
  transition: width 0.3s ease;
`;

const ProgressLabel = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #3f3d3d;
  font-weight: bold;
`;

const ProgressBar = ({ percentage }: { percentage: number }) => {
  return (
    <ProgressBarContainer>
      <ProgressBarFill style={{ width: `${percentage}%` }}>
        <ProgressLabel>{`${percentage}%`}</ProgressLabel>
      </ProgressBarFill>
    </ProgressBarContainer>
  );
};

export default ProgressBar;
