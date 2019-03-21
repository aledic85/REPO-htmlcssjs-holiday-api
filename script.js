function printTitle(month, year) {

  var h1 = $("h1");
  var mom = moment()
  var month = mom.month(month);
  var year = mom.year(year);
  var date = mom.format("MMMM YYYY")
  var daysInMonth = mom.daysInMonth();

  h1.text(date + " " + "1" + "-" + daysInMonth);
}

function printDate(month, year) {

  var daysInMonth = moment().month(month).daysInMonth();
  var template = $("#template").html()
  var compiled = Handlebars.compile(template)

  for (var day = 1; day <= daysInMonth; day++) {

    var data = {

      date: pageDate(month, year, day),
      format: serverDate(month, year, day)
    }

    var li = compiled(data);

    $("ul").append(li);
  }
}

function pageDate(month, year, day) {

  var mom = moment();
  var month = mom.month(month);
  var year = mom.year(year);
  var date = mom.date(day);
  var date = mom.format("DD MMMM YYYY");

  return date;
}

function serverDate(month, year, day) {

  var mom = moment();
  var month = mom.month(month);
  var year = mom.year(year);
  var date = mom.date(day);
  var format = mom.format("YYYY-MM-DD");

  return format;
}

function getHolidays(month, year) {

  var data = {

    year: year,
    month: month
  }

  $.ajax({

    url: "https://flynn.boolean.careers/exercises/api/holidays",
    method: "GET",
    data: data,
    success: function(isData, state) {

      if (isData.success) {

        var holidays = isData.response;

        printHolidays(holidays);
      }
    },
    error: function(request, state, error) {

      alert("L'indirizzo del server è errato!");
    }
  })
}

function printHolidays(holidays) {

  for (var i = 0; i < holidays.length; i++) {

    day = holidays[i];
    var name = day.name;
    var date = day.date;

    // li[data-date='2018-01-01']

    var liRed = $("li[data-date='" + date + "']");

    liRed.addClass("liRed").text(liRed.text() + " " + name);
  }
}

function init() {

  var month = 0;
  var year = 2018;
  var next = $("#next");
  var prew = $("#prew");

  printTitle(month, year);
  printDate(month, year);
  getHolidays(month, year);

  next.click(function() {

    if (month < 11) {

      month++

      $("li").remove();
      printTitle(month, year);
      printDate(month, year);
      getHolidays(month, year);
    } else {

      alert("Il calendario è valido solo per il 2018!")
    }

  });

  prew.click(function() {

    if (month > 0) {

      month--

      $("li").remove();
      printTitle(month, year);
      printDate(month, year);
      getHolidays(month, year);
    } else {

      alert("Il calendario è valido solo per il 2018!")
    }
  })
}

$(document).ready(init);
