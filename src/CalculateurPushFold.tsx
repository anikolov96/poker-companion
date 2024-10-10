
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

// RANGES_DE_MAIN
const RANGES_DE_MAIN: RangesDeMain = {
  '15bb': {
    1: { 
      avecAntes: "22+ Kx+ Q2s+ Q5o+ J2s+ J8o+ T4s+ T7o+ 95s+ 97o+ 85s+ 87o 74s+ 76o 64s+ 53s+ 43s", 
      sansAntes: "22+, Ax+, K2s+, K6o+, Q4s+, Q9o+, J6s+, J9o+, T6s+, T8o+, 96s+, 98o, 85s+, 75s+, 64s+, 54s" 
    },
    2: { 
      avecAntes: "22+ Ax+ K4s+ K9o+ Q6s+ QTo+ J7s+ JTo T7s+ T9o 96s+ 86s+ 76s 65s", 
      sansAntes: "22+, A2s+, A5o+, K6s+, KTo+, Q8s+, QTo+, J8s+, JTo, T7s+, 97s+, 87s, 76s" 
    },
    3: { 
      avecAntes: "22+ A2s+ A3o+ K6s+ KTo+ Q8s+ QTo+ J8s+ JTo T8s+ 97s+ 87s 76s", 
      sansAntes: "22+, A7s+, A5s-A4s, ATo+, K8s+, KJo+, Q9s+, QJo, J9s+, T9s, 98s" 
    },
    4: { 
      avecAntes: "22+ A2s+ A9o+ K8s+ KJo+ Q9s+ QJo J8s+ JTo T8s+ 98s", 
      sansAntes: "22+, A9s+, A5s, ATo+, K9s+, KQo, Q9s+, J9s+,T9s" 
    },
    5: { 
      avecAntes: "22+ A8s+ A5s ATo+ K9s+ KJo+ Q9s+ QJo J9s+ T9s 98s", 
      sansAntes: "88+, A8s+, A5s-A3s, AJo+, KTs+, KQo, QTs+, JTs" 
    },
    6: { 
      avecAntes: "22+ A9s+ A5s ATo+ K9s+ KQo QTs+ J9s+ T9s", 
      sansAntes: "TT+, ATs+, AJo+, KTs+, KQo, QJs" 
    },
    7: { 
      avecAntes: "55+ A9s+ A5s AJo+ K9s+ KQo QTs+ JTs", 
      sansAntes: "TT+, ATs+, AJo+ KJs+, QJs" 
    },
    8: { 
      avecAntes: "88+ A9s+ A5s AJo+ KTs+ KQo QTs+ JTs", 
      sansAntes: "TT+, ATs+, AQo+, KJs+" 
    },
  },
  '12bb': {
    1: {
      avecAntes: "22+ Qx+ J2s+ J7o+ T3s+ T7o+ 95s+ 97o+ 84s+ 87o 74s+ 76o 63s+ 53s+ 43s",
      sansAntes: "22+, A2+, K2s+, K3o+, Q2s+, Q8o+, J5s+, J9o+, T6s+, T8o+, 95s+, 98o, 85s+, 87o, 75s+, 64s+, 54s"
    },
    2: {
      avecAntes: "22+ Ax+ K2s+ K8o+ Q6s+ QTo+ J7s+ J9o+ T6s+ T9o 96s+ 86s+ 75s+ 65s 54s",
      sansAntes: "22+, A2+, K6s+, KTo+, Q8s+, QTo+, J8s+, JTo, T8s+, 97s+, 87s, 76s"
    },
    3: {
      avecAntes: "22+ Ax+ K6s+ KTo+ Q8s+ QTo+ J8s+ JTo T8s+ 97s+ 87s 76s",
      sansAntes: "22+, A2s+, A9o+, K9s+, KTo+, Q9s+, QJo, J8s+, JTo, T8s+, 98s"
    },
    4: {
      avecAntes: "22+ A2s+ A7o+ A5o K7s+ KTo+ Q8s+ QJo J8s+ JTo T8s+ 98s 87s",
      sansAntes: "22+, A8s+, A5s-A4s, ATo+, K9s+, KJo+, Q9s+, J9s+, T9s"
    },
    5: {
      avecAntes: "22+ A3s+ A9o+ K9s+ KJo+ Q9s+ QJo J9s+ T9s 98s",
      sansAntes: "33+, A9s+, A5s, AJo+, K9s+, KQo, QTs+, J9s+, T9s"
    },
    6: {
      avecAntes: "22+ A8s+ A5s ATo+ K9s+ KJo+ Q9s+ QJo J9s+ T9s 98s",
      sansAntes: "88+, 66, A9s+, A5s-A4s, AJo+, KTs+, KQo, QTs+, JTs"
    },
    7: {
      avecAntes: "22+ A9s+ AJo+ K9s+ KQo Q9s+ JTs T9s",
      sansAntes: "99+, ATs+, A5s, AQo+, KTs+, QTs+"
    },
    8: {
      avecAntes: "33+ A9s+ A5s AJo+ K9s+ KQo QTs+ JTs T9s",
      sansAntes: "TT+, ATs+, AJo+, KJs+, QJs"
    }
  },
  '10bb': {
    1: {
      avecAntes: "22+ Qx+ J2s+ J4o+ T2s+ T6o+ 93s+ 96o+ 84s+ 86o+ 74s+ 76o 63s+ 53s+ 43s",
      sansAntes: "22+ K2+ Q2s+ Q7o+ J3s+ J8o+ T5s+ T8o+ 95s+ 97o+ 85s+ 87o 74s+ 64s+ 53s+"
    },
    2: {
      avecAntes: "22+ Ax+ K2s+ K6o+ Q5s+ Q9o+ J7s+ J9o+ T6s+ T9o 96s+ 86s+ 75s+ 65s 54s",
      sansAntes: "22+ A2+ K6s+ KTo+ Q8s+ QTo+ J8s+ JTo T8s+ 97s+ 87s 76s"
    },
    3: {
      avecAntes: "22+ Ax+ K5s+ KTo+ Q8s+ QTo+ J8s+ JTo T7s+ 97s+ 86s+ 76s 65s",
      sansAntes: "22+ A2s+ A7o+ A5o K7s+ KTo+ Q8s+ QTo+ J8s+ JTo T8s+ 98s 87s"
    },
    4: {
      avecAntes: "22+ A2s+ A4o+ K7s+ KTo+ Q8s+ QTo+ J8s+ JTo T8s+ 97s+ 87s 76s",
      sansAntes: "22+ A7s+ A5s-A3s ATo+ K8s+ KJo+ Q8s+ QJo J8s+ T8s+ 98s"
    },
    5: {
      avecAntes: "22+ A2s+ A8o+ K7s+ KTo+ Q9s+ QJo J8s+ JTo T8s+ 98s 87s",
      sansAntes: "22+ A8s+ A5s-A4s ATo+ K9s+ KQo Q9s+ J9s+ T9s"
    },
    6: {
      avecAntes: "22+ A7s+ A5s-A3s A9o+ K9s+ KJo+ Q9s+ QJo J9s+ T8s+ 98s",
      sansAntes: "33+ A9s+ A5s AJo+ K9s+ KQo QTs+ J9s+ T9s"
    },
    7: {
      avecAntes: "22+ A7s+ A5s-A4s ATo+ K9s+ KJo+ Q9s+ QJo J9s+ T9s 98s",
      sansAntes: "55+ ATs+ AJo+ KTs+ QTs+ JTs"
    },
    8: {
      avecAntes: "22+ A9s+ ATo+ K9s+ KQo Q9s+ JTs T9s",
      sansAntes: "99+ A9s+ A5s AJo+ KTs+ QTs+ JTs"
    }
  },
  '7bb': {
    1: {
      avecAntes: "22+ Tx+ 92s+ 95o+ 82s+ 85o+ 73s+ 75o+ 63s+ 65o 52s+ 54o 42s+",
      sansAntes: "22+ Qx+ J2s+ J6o+ T3s+ T7o+ 95s+ 97o+ 84s+ 87o 74s+ 76o 64s+ 53s+ 43s"
    },
    2: {
      avecAntes: "22+ Kx+ Q3s+ Q8o+ J7s+ J9o+ T7s+ T9o 97s+ 86s+ 76s 65s",
      sansAntes: "22+ Ax+ K2s+ K8o+ Q6s+ QTo+ J7s+ JTo T7s+ 97s+ 86s+ 76s 65s"
    },
    3: {
      avecAntes: "22+ Ax+ K2s+ K7o+ Q6s+ Q9o+ J7s+ JTo T7s+ T9o 97s+ 86s+ 76s 65s",
      sansAntes: "22+ Ax+ K6s+ KTo+ Q9s+ QTo+ J8s+ T8s+ 98s 87s"
    },
    4: {
      avecAntes: "22+ Ax+ K5s+ K9o+ Q8s+ QTo+ J8s+ JTo T8s+ 97s+ 87s 76s",
      sansAntes: "22+ A2s+ A7o+ A5o K7s+ KTo+ Q9s+ QJo J8s+ JTo T8s+ 98s 87s"
    },
    5: {
      avecAntes: "22+ Ax+ K6s+ KTo+ Q9s+ QTo+ J8s+ JTo T8s+ 98s 87s",
      sansAntes: "22+ A2s+ A9o+ K9s+ KJo+ Q9s+ QJo J8s+ T8s+ 98s"
    },
    6: {
      avecAntes: "22+ A2s+ A7o+ A5o K7s+ KTo+ Q9s+ QJo J8s+ T8s+ 98s 87s",
      sansAntes: "22+ A7s+ A5s-A3s ATo+ K9s+ KJo+ Q9s+ QJo J9s+ T9s"
    },
    7: {
      avecAntes: "22+ A2s+ A8o+ K8s+ KTo+ Q9s+ QJo J9s+ T8s+ 98s",
      sansAntes: "22+ A8s+ A5s ATo+ K9s+ KQo Q9s+ J9s+ T9s"
    },
    8: {
      avecAntes: "22+ A3s+ A9o+ K9s+ KJo+ Q9s+ QJo J9s+ T9s 98s",
      sansAntes: "33+ A8s+ A5s AJo+ K9s+ KQo QTs+ JTs T9s"
    }
  },
  '5bb': {
    1: {
      avecAntes: "22+ Tx+ 92s+ 93o+ 82s+ 84o+ 73s+ 75o+ 63s+ 65o 53s+ 43s",
      sansAntes: "22+ Jx+ T2s+ T5o+ 93s+ 96o+ 84s+ 86o+ 74s+ 76o 64s+ 53s+"
    },
    2: {
      avecAntes: "22+ Kx+ Q2s+ Q6o+ J5s+ J8o+ T6s+ T8o+ 97s+ 87s",
      sansAntes: "22+ Ax+ K2s+ K5o+ Q6s+ Q9o+ J8s+ JTo T8s+ 97s+ 87s 76s"
    },
    3: {
      avecAntes: "22+ Ax+ K2s+ K4o+ Q3s+ Q8o+ J6s+ J8o+ T7s+ T9o 97s+ 87s 76s",
      sansAntes: "22+ Ax+ K3s+ K9o+ Q8s+ QTo+ J8s+ JTo T8s+ 98s 87s"
    },
    4: {
      avecAntes: "22+ Ax+ K2s+ K7o+ Q6s+ Q9o+ J8s+ JTo T8s+ 98s 87s",
      sansAntes: "22+ Ax+ K6s+ K9o+ Q9s+ QTo+ J9s+ T8s+ 98s"
    },
    5: {
      avecAntes: "22+ Ax+ K3s+ K9o+ Q7s+ QTo+ J8s+ JTo T8s+ 98s",
      sansAntes: "22+ A2s+ A4o+ K7s+ KTo+ Q9s+ QJo J9s+ T8s+ 98s"
    },
    6: {
      avecAntes: "22+ Ax+ K5s+ K9o+ Q8s+ QTo+ J9s+ JTo T9s 98s",
      sansAntes: "22+ A2s+ A8o+ K7s+ KTo+ Q9s+ QJo J9s+ T9s 98s"
    },
    7: {
      avecAntes: "22+ A2s+ A4o+ K5s+ KTo+ Q8s+ QTo+ J9s+ JTo T9s",
      sansAntes: "22+ A2s+ A9o+ K9s+ KJo+ Q9s+ QJo J9s+ T9s"
    },
    8: {
      avecAntes: "22+ A2s+ A7o+ A5o K6s+ KTo+ Q8s+ QTo+ J9s+ T9s",
      sansAntes: "22+ A3s+ ATo+ K9s+ KJo+ Q9s+ J9s+ T9s"
    }
  },
  // Ajoute d'autres tailles de BB ici (10bb, 7.5bb, etc.)
};

const CalculateurPushFold: React.FC = () => {
  const [stackSize, setStackSize] = useState<number>(15);
  const [avecAntes, setAvecAntes] = useState<boolean>(false);
  const [joueursRestants, setJoueursRestants] = useState<number>(2);
  const [range, setRange] = useState<string>("");

  const taillesDeStack = [15, 12, 10, 7, 5];

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
