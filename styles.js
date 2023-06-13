const player = document.getElementById("search-player");
const submit = document.querySelector("[data-submit]");

submit.addEventListener("click", (button) => {
  const playerSearch = player.value;
  const bballAPI = `https://www.balldontlie.io/api/v1/players?search=${playerSearch};`;
  getPlayerInfo(bballAPI);
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
        position,
        height_feet,
        height_inches,
        weight_pounds,
      },
    ] = data;

    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const playerPosition = document.getElementById("position");
    const playerHeight = document.getElementById("height");
    const playerWeight = document.getElementById("weight");

    firstName.textContent = `${first_name}`;
    lastName.textContent = `${last_name}`;
    playerPosition.textContent = `${position}`;
    playerHeight.textContent = `${height_feet} ' ${height_inches}`;
    playerWeight.textContent = `${weight_pounds}`;

    getSeasonAverages(player_id);
  } catch (error) {
    console.log(error);
  }
};

const getSeasonAverages = async (player_id) => {
  try {
    const seasonStats = `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${player_id}`;
    const seasonsURL = `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${player_id}`;
    const response = await fetch(seasonStats);
    const { data } = await response.json();

    const [
      {
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
