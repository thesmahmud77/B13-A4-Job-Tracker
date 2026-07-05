const jobs = [
  {
    id: 1,
    company: "Mobile First Corp",
    role: "React Native Developer",
    type: "Remote • Full-time",
    salary: "$130k - $175k",
    desc: "Build cross-platform mobile applications using React Native. Work on global products.",
    status: "NOT APPLIED",
  },
  {
    id: 2,
    company: "WebFlow Agency",
    role: "Web Designer & Developer",
    type: "LA • Part-time",
    salary: "$80k - $120k",
    desc: "Create stunning web experiences for high-profile clients with modern web trends.",
    status: "NOT APPLIED",
  },
  {
    id: 3,
    company: "DataViz Solutions",
    role: "Data Visualization Specialist",
    type: "Boston • Full-time",
    salary: "$125k - $165k",
    desc: "Transform complex data into visualizations using D3.js and React.",
    status: "NOT APPLIED",
  },
  {
    id: 4,
    company: "CloudFirst Inc",
    role: "Backend Developer",
    type: "Seattle • Full-time",
    salary: "$140k - $190k",
    desc: "Design and maintain scalable backend systems using Python and AWS.",
    status: "NOT APPLIED",
  },
  {
    id: 5,
    company: "Innovation Labs",
    role: "UI/UX Engineer",
    type: "Austin • Full-time",
    salary: "$110k - $150k",
    desc: "Create beautiful and functional user interfaces for our suite of products.",
    status: "NOT APPLIED",
  },
  {
    id: 6,
    company: "MegaCorp Solutions",
    role: "JavaScript Developer",
    type: "NYC • Full-time",
    salary: "$130k - $170k",
    desc: "Build enterprise applications with JavaScript and modern frameworks.",
    status: "NOT APPLIED",
  },
  {
    id: 7,
    company: "StartupXYZ",
    role: "Full Stack Engineer",
    type: "Remote • Full-time",
    salary: "$120k - $160k",
    desc: "Join our fast-growing startup and work on our core platform using Node.js.",
    status: "NOT APPLIED",
  },
  {
    id: 8,
    company: "TechCorp Industries",
    role: "Senior Frontend Developer",
    type: "SF • Full-time",
    salary: "$130k - $175k",
    desc: "Build scalable web applications using React and TypeScript.",
    status: "NOT APPLIED",
  },
  {
    id: 9,
    company: "Bitapea",
    role: "AI Engineer",
    type: "Full-time",
    salary: "$320k - $460k",
    desc: "Join our fast-growing startup and work on our core platform using Node.js.",
    status: "NOT APPLIED",
  },
];

let currentFilter = "ALL";

function renderJobs() {
  const container = document.getElementById("job-card-container");
  const noJobsView = document.getElementById("no-jobs-view");

  container.innerHTML = "";

  const filteredJobs = jobs.filter((job) => {
    if (currentFilter === "ALL") return true;
    return job.status === currentFilter;
  });

  if (filteredJobs.length === 0) {
    container.classList.add("hidden");
    noJobsView.classList.remove("hidden");
  } else {
    container.classList.remove("hidden");
    noJobsView.classList.add("hidden");

    filteredJobs.forEach((job) => {
      let cardStyle = "bg-white border-gray-100";
      if (job.status === "INTERVIEW")
        cardStyle = "bg-emerald-50 border-emerald-200 shadow-emerald-100";
      if (job.status === "REJECTED")
        cardStyle = "bg-red-50 border-red-200 shadow-red-100";

      // স্ট্যাটাসের ওপর ভিত্তি করে বাটন নির্ধারণ করা হচ্ছে
      let actionButtons = "";
      if (job.status === "NOT APPLIED") {
        actionButtons = `
          <button onclick="updateStatus(${job.id}, 'INTERVIEW')" class="btn btn-outline btn-success btn-sm rounded-xl">INTERVIEW</button>
          <button onclick="updateStatus(${job.id}, 'REJECTED')" class="btn btn-outline btn-error btn-sm rounded-xl">REJECTED</button>
        `;
      } else {
        actionButtons = `
          <button onclick="deleteStatus(${job.id})" class="btn btn-error btn-sm rounded-xl w-full text-white">Delete</button>
        `;
      }

      const card = document.createElement("div");
      card.className = `${cardStyle} p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border flex flex-col justify-between`;

      card.innerHTML = `
        <div>
          <div class="flex justify-between items-center mb-4">
            <span class="text-xs font-bold text-blue-500 uppercase tracking-widest">${job.type}</span>
            <span class="badge badge-sm ${statusColor(job.status)} font-bold p-3">${job.status}</span>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-1">${job.role}</h3>
          <p class="text-sm font-semibold text-gray-400 mb-4">${job.company}</p>
          <div class="bg-white/60 text-blue-700 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4 border border-blue-100">
            ${job.salary}
          </div>
          <p class="text-gray-500 text-sm leading-relaxed mb-6">${job.desc}</p>
        </div>
        <div class="grid grid-cols-1 gap-4 border-t border-gray-200/50 pt-6">
          ${actionButtons}
        </div>
      `;
      container.appendChild(card);
    });
  }

  updateDashboard(filteredJobs.length);
}

// DashBoard Calculation
function updateDashboard(filteredCount) {
  const totalAvailable = jobs.filter((j) => j.status === "NOT APPLIED").length;
  const interview = jobs.filter((j) => j.status === "INTERVIEW").length;
  const rejected = jobs.filter((j) => j.status === "REJECTED").length;

  document.getElementById("total-count").innerText = totalAvailable;
  document.getElementById("interview-count").innerText = interview;
  document.getElementById("rejected-count").innerText = rejected;
  document.getElementById("job-count-badge").innerText =
    `${filteredCount} jobs`;
}

function statusColor(status) {
  if (status === "INTERVIEW") return "badge-success text-white";
  if (status === "REJECTED") return "badge-error text-white";
  return "badge-ghost text-gray-400";
}

function updateStatus(id, newStatus) {
  const job = jobs.find((j) => j.id === id);
  if (job && job.status === "NOT APPLIED") {
    job.status = newStatus;
    renderJobs();
  }
}

// ডিলিট বা রিলিজ করার ফাংশন
function deleteStatus(id) {
  const job = jobs.find((j) => j.id === id);
  if (job) {
    job.status = "NOT APPLIED";
    renderJobs();
  }
}

function filterJobs(filterType) {
  currentFilter = filterType;

  const types = ["all", "interview", "rejected"];
  types.forEach((type) => {
    const btn = document.getElementById(`btn-${type}`);
    if (type === filterType.toLowerCase()) {
      btn.classList.add("btn-primary");
      btn.classList.remove("btn-outline");
    } else {
      btn.classList.remove("btn-primary");
      btn.classList.add("btn-outline");
    }
  });

  renderJobs();
}

document.addEventListener("DOMContentLoaded", renderJobs);
