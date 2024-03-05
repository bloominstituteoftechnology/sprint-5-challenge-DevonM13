async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇
  // fetching data //
  const learners = await axios.get('http://localhost:3003/api/learners');
  const mentors = await axios.get('http://localhost:3003/api/mentors');

  // combining data //
  const finalData = learners.data.map(learner => {
    const mentorsId = mentors.data.filter(mentor => learner.mentors.includes(mentor.id));
    const mentorsFullName = mentorsId.map(mentor => `${mentor.firstName} ${mentor.lastName}`);
    return {...learner, mentors: mentorsFullName};
  })
  


  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
