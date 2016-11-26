package linkshare;

import org.springframework.data.annotation.Id;

public class Link {

	@Id private String id;

	private String link;
	private String img;
	private String tag;
	private String description;
	private String ownerEmail;
	private int rate;
	private int rateQnt;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getOwnerEmail() {
		return ownerEmail;
	}

	public void setOwnerEmail(String ownerEmail) {
		this.ownerEmail = ownerEmail;
	}

	public int getRate() {
		return rate;
	}

	public void setRate(int rate) {
		this.rate = rate;
	}

	public void setRateQnt(int rateQnt) {
		this.rateQnt = rateQnt;
	}
	public int getRateQnt() {
		return rateQnt;
	}

}
