console.log('here')
    fetch('http://suggestqueries.google.com/complete/search?q=ob&client=firefox')
      .then(res => res.json())
      .then(json => console.log(json))