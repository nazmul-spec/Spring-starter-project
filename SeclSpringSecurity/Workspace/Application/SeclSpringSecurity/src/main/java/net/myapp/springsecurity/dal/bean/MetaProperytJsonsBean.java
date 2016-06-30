package net.myapp.springsecurity.dal.bean;

import java.util.List;




public class MetaProperytJsonsBean extends AbstractBean {
	
	private static final long serialVersionUID = 1L;

	private List<MetaProperytJsonBean> metaProperytJsonBeans;

	public List<MetaProperytJsonBean> getMetaProperytJsonBeans() {
		return metaProperytJsonBeans;
	}

	public void setMetaProperytJsonBeans(
			List<MetaProperytJsonBean> metaProperytJsonBeans) {
		this.metaProperytJsonBeans = metaProperytJsonBeans;
	}
}
