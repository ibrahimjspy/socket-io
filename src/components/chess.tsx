import { useState } from "react";
import { Chess, Move, Square, } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function PlayRandomMoveEngine() {
    const [game, setGame] = useState(new Chess('rnbqkqnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKQNR w KQkq - 0 1'));
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);

  const makeAMove = (move: { from: Square, to: Square }): Move | null => {
    try {
        const gameCopy = new Chess(game.fen());
        const result = gameCopy.move(move);
    
        if (result === null) {
          console.error('Illegal move');
          return null;
        }
    
        setGame(gameCopy);
        return result;
    } catch (error) {
        console.error(error);
    }
  };

  const onDrop = (sourceSquare: Square, targetSquare: Square): boolean => {
    const move = makeAMove({ from: sourceSquare, to: targetSquare });

    if (move === null) {
      alert('Illegal move');
      return false;
    }

    return true;
  };

  const onMouseOverSquare = (square: Square) => {
    const moves = game.moves({ square, verbose: true });

    setPossibleMoves(moves.map((move) => move.to));
  };

  const onMouseOutSquare = () => setPossibleMoves([]);

  return (
    <Chessboard 
      position={game.fen()} 
      onPieceDrop={onDrop} 
      onMouseOverSquare={onMouseOverSquare}
      onMouseOutSquare={onMouseOutSquare}
      boardWidth={700} 
      onPieceClick={() => alert('Piece clicked')} 
      showBoardNotation={true}
      arePremovesAllowed={true}
      customSquareStyles={possibleMoves.reduce((a, c) => ({ ...a, [c]: { backgroundColor: 'black' } }), {})}
    />
  );
}