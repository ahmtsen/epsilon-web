import { Questionnaire } from "../generated/graphql";

export const createQuestionnaireDisplay = (answers: Questionnaire): string => {
  let body = "";
  if (answers.question1) {
    body +=
      "<p>Do you (they) have any of these life-threatening symptoms?</p><ul>";
    const answer = JSON.parse(answers.question1);
    answer.forEach((x: string, index: number) => {
      body += "<li>" + x + "</li>";
      if (index + 1 === answer.length) {
        body = body + "</ul>";
      }
    });
  }
  if (answers.question2) {
    body +=
      "<p>Do you (they) have any of these life-threatening symptoms?</p><ul>";
    const answer = JSON.parse(answers.question2);
    answer.forEach((x: string, index: number) => {
      body += "<li>" + x + "</li>";
      if (index + 1 === answer.length) {
        body = body + "</ul>";
      }
    });
  }

  if (answers.question3) {
    body += "<p>Are you (they) feeling sick?</p>";
    body += "<p>" + answers.question3 ? "Yes" : "No" + "</p>";
  }
  if (answers.question4) {
    body += "<p>Do you (they) have any of the following symptoms?</p>";
    const answer = JSON.parse(answers.question4);
    answer.forEach((x: string, index: number) => {
      body += "<li>" + x + "</li>";
      if (index + 1 === answer.length) {
        body = body + "</ul>";
      }
    });
  }
  if (answers.question5) {
    body +=
      "<p>In the last two weeks, did you (they) care for or have close contact (within 6 feet of an infected person for a cumulative total of 15 minutes in a 24-hour period) with someone with symptoms of COVID-19, tested for COVID- 19, or diagnosed with COVID-19?</p>";
    body += "<p>" + answers.question5 + "</p>";
  }
  if (answers.question6) {
    body +=
      "<p>n the last two weeks, have you (they) attended or spent time in a group setting (for example school, dormitory, child care, sporting event)?</p>";
    body += "<p>" + answers.question6 ? "Yes" : "No" + "</p>";
  }
  return body;
};
