import { getById } from "../api/data.js";
import { e } from "../dom.js";

const section = document.getElementById('detailsPage');
section.remove();

export async function showDetailsPage(ctx, id) {
    console.log(id)
    ctx.showSection(section);
}

async function loadIdea(id) {
    const idea = await getById(id);
    
}