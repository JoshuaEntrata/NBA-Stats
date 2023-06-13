const player = document.getElementById("search-player");
const submit = document.querySelector("[data-submit]");
const bar = document.getElementById("results");

submit.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent form submission and page refresh
  const playerSearch = player.value;
  const bballAPI = `https://www.balldontlie.io/api/v1/players?search=${playerSearch}`;
  getPlayerInfo(bballAPI);
  const bar = document.getElementById("results");
  bar.classList.add("hide");
});

const getPlayerInfo = async (bballAPI) => {
  try {
    const response = await fetch(bballAPI);
    const { data } = await response.json();

    const [
      {
        player_id,
        first_name,
        last_name,
        team,
        position,
        height_feet,
        height_inches,
        weight_pounds,
      },
    ] = data;

    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const playerTeam = document.getElementById("team");
    const playerPosition = document.getElementById("position");
    const playerHeight = document.getElementById("height");
    const playerWeight = document.getElementById("weight");

    firstName.textContent = `${first_name}`;
    lastName.textContent = `${last_name}`;
    playerTeam.textContent = `${team.full_name}`;
    playerPosition.textContent = `${position}`;
    playerHeight.textContent = `${height_feet}'${height_inches}`;
    playerWeight.textContent = `${weight_pounds} lbs`;

    getSeasonAverages(player_id);
  } catch (error) {
    console.log(error);
  }
};

const getSeasonAverages = async (player_id) => {
  try {
    const seasonStats = `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${player_id}`;
    const response = await fetch(seasonStats);
    const { data } = await response.json();

    const [
      {
        season,
        games_played,
        min,
        pts,
        fg_pct,
        fg3_pct,
        ft_pct,
        reb,
        ast,
        stl,
        blk,
        turnover,
      },
    ] = data;

    const statsSeason = document.getElementById("stats-season");
    const statsGP = document.getElementById("stats-gp");
    const statsMPG = document.getElementById("stats-mpg");
    const statsPPG = document.getElementById("stats-ppg");
    const statsFG = document.getElementById("stats-fg");
    const stats3FG = document.getElementById("stats-3fg");
    const statsFT = document.getElementById("stats-ft");
    const statsRPG = document.getElementById("stats-rpg");
    const statsAPG = document.getElementById("stats-apg");
    const statsSPG = document.getElementById("stats-spg");
    const statsBPG = document.getElementById("stats-bpg");
    const statsTPG = document.getElementById("stats-tpg");

    statsSeason.textContent = `${season}`;
    statsGP.textContent = `${games_played}`;
    statsMPG.textContent = `${min}`;
    statsPPG.textContent = `${pts}`;
    statsFG.textContent = `${fg_pct}`;
    stats3FG.textContent = `${fg3_pct}`;
    statsFT.textContent = `${ft_pct}`;
    statsRPG.textContent = `${reb}`;
    statsAPG.textContent = `${ast}`;
    statsSPG.textContent = `${stl}`;
    statsBPG.textContent = `${blk}`;
    statsTPG.textContent = `${turnover}`;
  } catch (error) {
    console.log(error);
  }
};

const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const dropdownPlayersList = async () => {
  try {
    const playerName = player.value;
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/players?per_page=100&search=${playerName}`
    );
    const { data } = await response.json();

    document.querySelectorAll("a").forEach((e) => e.remove());
    if (playerName.length > 2) {
      for (let name of data) {
        const dropDown = document.createElement("a");
        if (name.id < 494 || name.id > 666603) {
          bar.classList.add("show");
          dropDown.classList.add("dropdown");

          dropDown.innerHTML = `${name.first_name} ${name.last_name} - ${name.team.abbreviation}`;
          dropDown.addEventListener("click", () => {
            player.value = `${name.first_name} ${name.last_name}`;
            bar.classList.add("hide");
            document.querySelectorAll("a").forEach((e) => e.remove());
            getPlayerInfo(
              `https://www.balldontlie.io/api/v1/players/${name.id}`
            );
          });

          bar.appendChild(dropDown);
        }
      }
    } else {
      document.querySelectorAll("a").forEach((e) => e.remove());
      bar.classList.remove("show");
    }
  } catch (error) {
    console.log(error);
  }
};

player.addEventListener("input", debounce(dropdownPlayersList, 500));
document.addEventListener("click", (event) => {
  const isPlayerListClicked = event.target.closest(".player-list");
  if (!isPlayerListClicked) {
    bar.classList.remove("show");
  }
});
