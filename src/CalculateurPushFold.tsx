
import React, { useState, useEffect } from 'react';

// Les types des données de range
type Range = {
  avecAntes: string;
  sansAntes: string;
};

type RangesDeMain = {
  [stackSize: string]: {
    [playersLeft: number]: Range;
  };
};

// RANGES_DE_MAIN reste identique, sauf qu'on ajoute un typage explicite
const RANGES_DE_MAIN: RangesDeMain = {
  '15bb': {
    8: { 
      avecAntes: "TT+, ATs+, KQs, AJo+", 
      sansAntes: "JJ+, AQs+, AKo" 
    },
  },
  '12.5bb': {
    2: {
      avecAntes: "22+, A2+, K6s+, KTo+, Q8s+, QTo+, J8s+, JTo, T8s+, 97s+, 87s, 76s",
      sansAntes: "22+, A2+, K6s+, KTo+, Q8s+, QTo+, J8s+, JTo, T8s+, 97s+, 87s, 76s"
    },
    3: {
      avecAntes: "22+, A2s+, A9o+, K8s+, KTo+, Q8s+, QJo, J8s+, JTo, T8s+, 98s",
      sansAntes: "22+, A2s+, A9o+, K8s+, KTo+, Q8s+, QJo, J8s+, JTo, T8s+, 98s"
    },
    4: {
      avecAntes: "22+, A8s+, A5s-A4s, ATo+, K9s+, KJo+, Q9s+, J9s+, T9s",
      sansAntes: "22+, A8s+, A5s-A4s, ATo+, K9s+, KJo+, Q9s+, J9s+, T9s"
    },
    5: {
      avecAntes: "33+, A9s+, A5s-A4s, AJo+, K9s+, KJo+, QTs+, JTs",
      sansAntes: "33+, A9s+, A5s-A4s, AJo+, K9s+, KJo+, QTs+, JTs"
    },
    6: {
      avecAntes: "88+, A9s+, A5s, AJo+, KTs+, KQo, QTs+, JTs",
      sansAntes: "88+, A9s+, A5s, AJo+, KTs+, KQo, QTs+, JTs"
    },
    7: {
      avecAntes: "99+, ATs+, A5s, AQo+, KTs+, QTs+",
      sansAntes: "99+, ATs+, A5s, AQo+, KTs+, QTs+"
    },
    8: {
      avecAntes: "TT+, ATs+, AJo+, KJs+, QJs",
      sansAntes: "TT+, ATs+, AJo+, KJs+, QJs"
    }
  },
  // Ajoute d'autres tailles de BB ici (10bb, 7.5bb, etc.)
};

const CalculateurPushFold: React.FC = () => {
  const [stackSize, setStackSize] = useState<number>(15);
  const [avecAntes, setAvecAntes] = useState<boolean>(false);
  const [joueursRestants, setJoueursRestants] = useState<number>(2);
  const [range, setRange] = useState<string>("");

  const taillesDeStack = [15, 12.5, 10, 7.5, 5];

  useEffect(() => {
    calculerRange();
  }, [stackSize, avecAntes, joueursRestants]);

  const calculerRange = () => {
    const rangesBB = RANGES_DE_MAIN[`${stackSize}bb`];
    if (rangesBB) {
      const joueursProche = Object.keys(rangesBB)
        .map(Number)
        .reduce((prev, curr) => {
          return Math.abs(curr - joueursRestants) < Math.abs(prev - joueursRestants) ? curr : prev;
        });

      setRange(rangesBB[joueursProche][avecAntes ? 'avecAntes' : 'sansAntes']);
    } else {
      setRange("");
    }
  };

  const buttonBaseClass = "py-2 px-3 rounded-lg transition-all duration-200 min-w-[70px] text-center";
  const buttonActiveClass = "bg-green-600 text-white shadow-lg shadow-green-600/30";
  const buttonInactiveClass = "bg-gray-700 text-gray-300 hover:bg-gray-600";

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-green-400">
            Calculateur Push/Fold
          </h1>

          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-semibold mb-3 text-green-400">
                Taille de Stack (BB)
              </h2>
              <div className="flex flex-wrap gap-2">
                {taillesDeStack.map((taille) => (
                  <button
                    key={taille}
                    onClick={() => setStackSize(taille)}
                    className={`${buttonBaseClass} ${
                      stackSize === taille ? buttonActiveClass : buttonInactiveClass
                    }`}
                  >
                    {taille}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-semibold mb-3 text-green-400">
                Antes
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={() => setAvecAntes(false)}
                  className={`flex-1 py-2 px-4 rounded-lg transition-all duration-200 ${
                    !avecAntes ? buttonActiveClass : buttonInactiveClass
                  }`}
                >
                  Non
                </button>
                <button
                  onClick={() => setAvecAntes(true)}
                  className={`flex-1 py-2 px-4 rounded-lg transition-all duration-200 ${
                    avecAntes ? buttonActiveClass : buttonInactiveClass
                  }`}
                >
                  Oui
                </button>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-4 md:p-5">
              <h2 className="text-lg md:text-xl font-semibold mb-3 text-green-400">
                Joueurs restants à agir
              </h2>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <button
                    key={num}
                    onClick={() => setJoueursRestants(num)}
                    className={`${buttonBaseClass} ${
                      joueursRestants === num ? buttonActiveClass : buttonInactiveClass
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {range && (
              <div className="bg-gray-800 rounded-xl p-4 md:p-5">
                <h2 className="text-lg md:text-xl font-semibold mb-3 text-green-400">
                  Mains recommandées pour tapis
                </h2>
                <div className="bg-gray-700 rounded-lg p-4 min-h-[100px] flex items-center justify-center">
                  <p className="text-lg md:text-xl font-mono text-gray-100 text-center">
                    {range}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculateurPushFold;
