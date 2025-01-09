type NewGameButtonProps = {};

const NewGameButton = ({ }: NewGameButtonProps) => {
    
  // For conditional styling
  //     ${gameStarted ? "bg-orange-800 bg-opacity-25 text-opacity-100" : "" // Set to inactive styling before first move
  //     }
  //   ${gameEnd && "bg-orange-800 text-orange-50 "} //Highlight after game complete

  return (
    <button
      className={`border border-orange-800 rounded-md py-2 px-4 text-center text-orange-800 text-sm hover:shadow-lg`}
      data-testid="new-game-btn"
    >
      New Game
    </button>
  );
};

export default NewGameButton;
