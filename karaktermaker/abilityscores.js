// roll 4d6d1 (4d6 drop 1)
function roll()
{
  var combined = 0, min = 7;  // min=7 > max possible
  for (let i = 0; i < 4; i++)
  {
    let r = d6();
    if (r < min) min = r;
    combined += r;
  }
  return combined - min;
}

function reroll(ability)
{
  let score = roll();
  let mod = getModifier(score);
  document.getElementById(ability).innerHTML = score + " (" + mod + ")";
}

function Ability(name, score=roll())
{
  this.name = name;
  this.short = this.name.toLowerCase().slice(0, 3);
  // for updating score:
  this.setScore = function(number)
  {
    this.score = number;
    this.mod = getModifier(this.score);
  }
  // set the score:
  this.setScore(score);
}


var abilities =
{
  str: new Ability("Strength"),
  dex: new Ability("Dexterity"),
  con: new Ability("Constitution"),
  int: new Ability("Intelligence"),
  wis: new Ability("Wisdom"),
  cha: new Ability("Charisma")
}


/** Makes a dropdown menu with items from the object argument, using the object's
    properties as values.
*/
function makeSelect(id, object)
{
  let html = "<select id=" + id + ">";
  for (key in object)
  {
    html += "<option value=" + key + ">" + object[key].name + "</option>";
  }
  html += "</select>";
  return html;
}


function refresh()
{
  for (a in abilities)
  {
    let i = abilities[a].short;
    document.getElementById(i).innerHTML = abilities[a].score + " (" +
                                           abilities[a].mod + ")";
  }
}

function rerollAll()
{
  for (a in abilities) abilities[a].setScore(roll());
  randomName();
  refresh();
}


function d6()
{
  return Math.floor(Math.random() * 6) + 1;
}


function getModifier(abilityScore)
{
  let mod = Math.floor(abilityScore / 2 - 5);
  if (mod < 0) return mod;
  return "+" + mod;
}

function swap()
{
  let from = document.getElementById("from").value;
  let to = document.getElementById("to").value;
  let fromScore = abilities[from].score;
  let toScore = abilities[to].score;
  abilities[from].setScore(toScore);
  abilities[to].setScore(fromScore);
  refresh();
}


function edit(a)
{
  let input = prompt("Edit ability score:", a.score);
  if (input != null)
  {
    if (isNaN(input) || input < 1 || input > 24)
    alert("Ability score must be a number between 1 and 24!");
    else a.setScore(input);
  }
  refresh();
}

function randomName()
{
  let pre = ["Dverg-", "Gnom-", "Prins ", "Grev ", "Ridder ", "Sir ", "Prinsesse ",
  "General ", "Lord ", "Herr ", "Fru ", "Sankt ", "S??ster ", "Fader ", "Grevinne ",
  "Lady ", "Sur-", "Mester ", "Lille-", "Sterke-", "Fr??ken ", "Broder ", "Aspirant "];

  let start = ["Tri", "My", "Li", "Go", "Ma", "Hi", "Pu", "Ny", "Quo", "Bo", "Ve",
  "Sta", "Le", "Dry", "Gri", "Au", "Mi", "Ni", "Re", "La", "Do", "Tro", "Bi", "Sja",
  "Kri", "Mo", "Ka", "Ti", "To", "O", "A", "E", "U", "Klo", "Qui", "Xa", "Si"];

  let mid = ["ni", "ta", "li", "be", "ve", "sha", "dry", "mi", "fi", "po", "a", "o",
  "e", "re", "ke", "go", "tu", "de", "mpo", "rga", "ra", "sve", "dre", "sta", "rde",
  "mpa", "npi", "sli", "fo"];

  let end = ["n", "dan", "nd", "da", "lla", "rind", "lf", "ng", "l", "x", "ks",
  "sla", "nnis", "ger", "mar", "nn", "ng", "na", "ssa", "rs", "ns", "no", "nka",
  "o", "a", "ls", "ke", "rg", "ver", "rit", "ssy", "ri", "rid", "rk", "n", "nd"];

  let inter = ["Mc", "bin "];//, "van ", "von ", "av "];

  let adj = ["S??lv", "Gull", "Stein", "Sl??v", "Dom", "Tung", "Flint", "St??l",
  "Jern", "Ild", "Torden", "Lyn", "Dverg", "Alve", "Hare", "Bj??rne", "Rapp",
  "L??ve", "Syv", "Stor", "Lille", "Pryd", "Drage", "Vond", "God", "Svart",
  "Sol", "M??ne", "Tr??tt", "Blod", "Vinter", "Stjerne", "Edel", "H??y", "Konge",
  "Adels", "Ram", "Skygge", "T??ke", "Sabel", "Sterk", "Stram", "Tapper", "Hav",
  "Morgen", "Orm", "Sommer", "Lett", "D??re", "Kvass", "Skarp", "Tromme",
  "Vind", "Sky", "Himmel", "Under", "Tre", "Strids", "Stolten", "D??ds", "Skam",
  "Vill", "Frossen", "Is", "Odels", "Volds", "Eng", "Henge"];

  let sub = ["hjerte", "hammer", "sverd", "arm", "fot", "vilje", "sinn", "skjold",
  "??ks", "kjeft", "tann", "mage", "vik", "sover", "vokter", "syl", "n??l", "dreng",
  "kjempe", "gnom", "lys", "dal", "rev", "kniv", "beger", "krok", "rytter", "kak",
  "borg", "dreper", "svans", "labb", "lugg", "ladd", "salt", "stierne", "knekt",
  "sjel", "t??re", "bukk", "muskel", "rygg", "troll", "s??nn", "datter", "ulv",
  "rot", "g??rd", "t??rn", "fyrste", "temmer", "torn", "r??ver", "tass", "hems",
  "saks", "spiss", "enke", "m??y", "mikkel", "skalle", "skjegg", "jeger", "v??pner",
  "smed", "tarm", "tamp", "pamp"];
  //

  let sted = ["fjellene", "dalen", "??ya", "by", "borg", "staden", "slott",
  "fjell", "vik", "slettene", "t??rnet", "??rkenen", "steppene", "mark", "land",
  "moen", "??sen", "heiene", "fjord", "g??rd", "riket", "topp", "sj??", "skog",
  "myr", "elv"];

  let titles = ["store", "yngre", "eldre", "sinte", "varsomme", "grusomme",
  "stolte", "ydmyke", "rike", "sterke", "magre", "mektige", "sparsomme",
  "lytefrie", "tredje", "f??rstef??dte", "ildsinte", "onde", "slu", "lure",
  "ivrige", "festglade", "muntre", "ber??mte", "veltalende", "olme", "dannede",
  "skolerte", "tankefulle", "krigerske", "rettferdige", "modige", "uredde",
  "heltemodige", "feige", "altruistiske", "omfangsrike", "begavede", "tapre",
  "rettskafne", "storsindige", "??refulle", "mystiske", "hellige", "vakre",
  "skj??nne", "vene", "stygge", "ufordragelige", "nedrige", "sindige", "kalde",
  "magiske", "fortryllede", "forheksede", "forbannede", "fastboende", "t??rste",
  "fordrukne", "edruelige", "morske", "glade", "underholdende", "melankolske",
  "vise", "kloke", "himmelfalne", "ignorante", "uvitende", "dystre", "svarte",
  "tykke", "innsmigrende", "intelligente", "sjarmerende", "sjokkerende",
  "gjenlevende", "siste", "enest??ende", "mirakul??se", "svakt selvlysende",
  "mumlende", "uforst??elige", "uheldige", "heldige", "underlige", "makel??se",
  "gjennomsnittlige", "illeluktende", "velduftende", "t??lmodige", "syke",
  "evige", "erfarne", "uerfarne"];

  let name = "";
  if (Math.random() < 0.05) name += randomChoice(pre);
  name += randomChoice(start);
  if (Math.random() < 0.3) name += randomChoice(mid);  // 30% chance of mid
  if (Math.random() < 0.1) name += randomChoice(mid);  // 10% chance of (extra) mid
  name += randomChoice(end) + " ";
  if (Math.random() < 0.02) name += randomChoice(inter);
  name += randomChoice(adj) + randomChoice(sub);
  if (Math.random() < 0.1) name += " den " + randomChoice(titles);
  if (Math.random() < 0.3) name += ", fra " + randomChoice(adj) + randomChoice(sted);

  // remove triple chars:
  name = name.replace(/([a-z])\1{2}/g, "$1$1");


  document.getElementById("name").innerHTML = name;
}

function randomChoice(array)
{
  return array[Math.floor(Math.random() * array.length)];
}

// Initialization
rerollAll();
